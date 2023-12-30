<template>
  <div class="input-wrap">
    <label for="iban">IBAN</label>
    <input type="text" 
           v-model="iban" 
           v-maska data-maska="@@## **** **** **** **** **** **** **** **** **** **** ****" 
           @input="updateIBAN()" 
           placeholder="IT68 D030 0203 2800 0420 0162 854"
           :class="state"/>
  </div>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const props = defineProps({
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const state = ref('')
  const iban = ref(props.initialValue || null)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }

  const updateIBAN = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      id: user.id,
      sender:'components/input/iban.vue'
    }).linkedBankAccounts({
      iban: iban.value
    });
    if(error) {
      state.value = 'error'
      ok.log('error', 'error updating IBAN', error)
    } else{
      state.value = 'success'
      ok.log('success', 'updated IBAN: '+iban.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>