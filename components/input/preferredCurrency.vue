<template>
  <div class="input-wrap">
    <label for="currency"> 
      Currency: 
    </label>
    <select v-model="currency" @change="updateProfile()" :class="state">
      <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.name}}</option>
    </select>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const { data: currencies } = await supabase.from('currencies').select('iso, name')
  const user = useSupabaseUser()
  const currency = ref(props.initial)

  const props = defineProps({
    initial: {
      type: String,
      required: false
    }
  })
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const { data, error } = await supabase
      .from('user_preferences')
      .insert({ 
        user_id: user.value.id,
        currency: currency.value, 
        message_entity_id: user.value.id,
        message_sender: 'components/input/preferredCurrency.vue' 
      })
      .select()

    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
<style scoped lang="scss">
.input-wrap{
  margin-top: $clamp;
}
</style>