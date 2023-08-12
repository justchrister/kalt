<template>
  <main>
      <block margin="half">
        <h1> 
          We are currently in invite only <code> beta </code>
        </h1>
        <p>
          If you would like to join, please fill out the form below, or reach out at <a href="mailto:sup@ka.lt">sup@ka.lt</a>.
        </p>
        <p>
          Navigating the complex securities regulations around the world means we have to do a lot of manual work in the beginning to be in accordance with know your customer and data protection legislation. 
        </p>
        <p>
          Thank you for your patience.
        </p>
      </block>
      <block>
        <form @submit.prevent="create()">
          <label for="email">
            Email
          </label>
          <input type="email" v-model="email">
          <label for="firstname">
            First name
          </label>
          <input type="text" v-model="firstName">
          <label for="lastname">
            Last name
          </label>
          <input type="text" v-model="lastName">
          <label for="country">
            Country
          </label>
          <input type="text" v-model="country">
          <button>
            request invite ↗ <loading-icon v-if="loading" />
          </button>
        </form>
      </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Request invite'
  })
  useHead({
    title: 'Request invite',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  const supabase = useSupabaseClient()
  const email = ref('');
  const firstName = ref('');
  const lastName = ref('');
  const country = ref('');
  const loading = ref(false);

  const create = async () => {
    loading.value = true;
    const { error, data } = await pub(supabase, {"sender":"pages/request/index.vue"}).requestAccess({
      'firstName': firstName.value,
      'lastName': lastName.value,
      'email': email.value,
      'country': country.value
    });
    loading.value = false;
    if(error){
      ok.log('error', 'could not request access '+error.message)
    } else {
      ok.log('success', 'requested access')
      navigateTo('/request/success')
    }
  }

</script>
<style scoped lang="scss">
  input{
    margin-bottom:$clamp-0-5;
  }
  button{
    margin-top:$clamp-1-5;
  }
</style>