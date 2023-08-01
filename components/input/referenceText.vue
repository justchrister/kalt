<template>
  <div class="input-wrap">
    <label for="reference">Reference text</label>
    <input type="text" v-model="reference" @input="updateReference()"/>
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
  const reference = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }

  const updateReference = async () => {
    const { error, data } = await pub(supabase, {
      sender:'components/input/referenceText.vue'
    }).linkedBankAccounts({
      userId: user.value.id,
      bankCode: reference.value
    });
    if(error) {
      ok.log('error', 'error updating reference', error)
    } else{
      ok.log('success', 'updated reference: '+reference.value)
    }
  }

</script>
<style scoped lang="scss">
  
</style>