<template>
  <div class="input-wrap">
    <label for="bankCode">Bank code (swift/bic)</label>
    <input type="text" 
           v-model="bankCode" 
           v-maska data-maska="@@@@ @@ ** ***" 
           @input="updateBankCode()" 
           placeholder="KALT NO 11 234" 
           :class="state"/>
  </div>
</template>
<script setup lang="ts">
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
  const bankCode = ref(props.initialValue)
  const updateBankCode = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      id: user.id,
      sender:'components/input/bankCode.vue'
    }).linkedBankAccounts({
      bankCode: bankCode.value
    });
    if(error) {
      state.value = 'error'
      ok.log('error', 'error updating bank code: '+error.message)
    } else{
      state.value = 'success'
      ok.log('success', 'updated bank code: '+bankCode.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>