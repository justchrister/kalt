<template>
  <main>
    <block margin="2">
      <progress-bar percentage="20%" />
    </block>
    <block>
      <p>
        What is the source of the money you are planning on investing?
      </p>
      <form @submit.prevent="save()">
        <input type="radio" id="income" name="sourceOfFunds" value="income" v-model="sourceOfFunds" @click="save()">
        <label class="radioRow" for="income">
          <span> Employment or business income </span>
          <span class="radio-icon"></span>
        </label>
        <input type="radio" id="investments" name="sourceOfFunds" value="investments" v-model="sourceOfFunds" @click="save()">
        <label class="radioRow" for="investments">
          <span> Investment returns </span>
          <span class="radio-icon"></span>
        </label>
        <input type="radio" id="inheritance" name="sourceOfFunds" value="inheritance" v-model="sourceOfFunds" @click="save()">
        <label class="radioRow" for="inheritance">
          <span> Inheritance </span>
          <span class="radio-icon"></span>
        </label>
        <input type="radio" id="savings" name="sourceOfFunds" value="savings" v-model="sourceOfFunds" @click="save()">
        <label class="radioRow" for="savings">
          <span> Savings and personal assets </span>
          <span class="radio-icon"></span>
        </label>
        <input type="radio" id="benefits" name="sourceOfFunds" value="benefits" v-model="sourceOfFunds" @click="save()">
        <label class="radioRow" for="benefits">
          <span> Government benefits or insurance payouts</span>
          <span class="radio-icon"></span>
        </label>
        <input-button link="/kyc/2">next -> </input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Source of funds',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'KYC',
    ogTitle: 'Kalt - KYC',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const sourceOfFunds = ref('');
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);

  const save = async () => {
    const error = await pub(supabase, {
      id: user.id,
      sender:'pages/profile/kyc/1.vue'
    }).kyc({
      'sourceOfFunds': sourceOfFunds.value
    });
    
  }
</script>
<style scoped lang="scss">
  
  input[type="radio"] {
      height: sizer(1);
      appearance: radio;
      border: 1px solid #ccc;
      margin-right: sizer(1);
      vertical-align: middle;
      margin:sizer(1);
      opacity:0;
      display:none;
  }
  label{
    margin:0;
    line-height:sizer(3);
    &:hover{
      cursor:pointer;
    }
  }
  .radioRow {
    margin-bottom: sizer(1);
    display: grid;
    grid-template-columns: 1fr sizer(3);
    @include border;
    @include hoverable;
    padding: sizer(1) sizer(2) sizer(1) sizer(1.5);
    &:hover{
      cursor:pointer;
      @include hovering;
    }
  }
  // if input radio is selected give .radioRow a selected class
  input[type="radio"]:checked + label {
    @include selected;
  }
</style>