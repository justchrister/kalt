<template>
  <div class="input-wrap">
    <label for="iban">IBAN</label>
    <input type="text" v-model="iban" v-maska data-maska="@@## **** **** ***" @input="updateIBAN()" placeholder="IT68 D030 0203 2800 0420 0162 854"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const props = defineProps({
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const iban = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }

  const updateIBAN = async () => {
    const { error, data } = await pub(supabase, {
      entity: user.value.id,
      sender:'components/input/iban.vue'
    }).linkedBankAccounts({
      userId: user.value.id,
      iban: iban.value
    });
    if(error) {
      ok.log('error', 'error updating IBAN', error)
    } else{
      ok.log('success', 'updated IBAN: '+iban.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>