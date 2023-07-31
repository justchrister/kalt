<template>
  <div class="input-wrap">
    <label for="iban">IBAN</label>
    <input type="text" v-model="iban" v-maska data-maska="@@## **** **** ***" @input="updateIBAN()"/>
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
    const { data, error } = await supabase
      .from('linked_bank_accounts')
      .insert({
        message_sender: 'components/input/iban.vue',
        userId: user.value.id,
        bank_code: iban.value
      })
    if(error) {
      ok.log('error', 'error updating IBAN', error)
    } else{
      ok.log('success', 'updated IBAN: '+iban.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>