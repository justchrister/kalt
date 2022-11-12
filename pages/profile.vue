<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient()
const user = useSupabaseUser()

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate')
    }
  })
})

const loading = ref(true)
const firstName = ref('')
const lastName = ref('')

const { data: userProfile } = await useAsyncData('user_profiles', async () => {
    loading.value = true
    const { data } = await supabase
        .from('user_profiles')
        .select('firstName, lastName, user_id')
        .eq('user_id', user.value.id)
        .single()
      loading.value = false
      return data
})

if (userProfile.value.user_id) {
    firstName.value = userProfile.value.firstName
    lastName.value = userProfile.value.lastName
}

async function updateProfile() {
    try {
        loading.value = true
        const updates = {
            firstName: firstName.value,
            lastName: lastName.value,
            updated_at: new Date(),
        }
        let { error } = await supabase.from('user_profiles').update(updates).match({'user_id': user.value.id})
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

async function signOut() {
    try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle='user.id' />
    <div class="page">
      <div class="section">
        <div class="block">
          <div class="frame">
            <div class="image" style="background-image:url(/images/values_02.jpg);margin-left:0;">
            </div>
          </div>
          <p class="title">
            {{ firstName }} {{ lastName }}
          </p>
          <nav>
            <ul>
              <li>
                Dashboard
              </li>
              <li>
                Preferences
              </li>
              <li>
                Transactions
              </li>
            </ul>
          </nav>
          <form @submit.prevent="updateProfile">
            <label for="email">Email</label>
            <input id="email" type="text" :value="user.email" disabled />
            <label for="first-name">First name</label>
            <input id="first-name" type="text" v-model="firstName" />
            <label for="first-name">Last name</label>
            <input id="first-name" type="text" v-model="lastName" />
            <input type="submit" :value="loading ? 'Loading ...' : 'Update'"
                :disabled="loading" />
            <button type="button" class="button block" @click="signOut">
                Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>