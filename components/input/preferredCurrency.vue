<template>
  <div class="input-wrap">
    <label for="preferred_currency"> 
      Currency: 
    </label>
    <select v-model="preferred_currency" @change="updateProfile()" :class="state">
      <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.name}}</option>
    </select>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const { data: currencies } = await supabase.from('currencies').select('iso, name').eq('available', true)

  const preferred_currency = ref('')

  const props = defineProps({
    initial: {
      type: String,
      required: false
    },
    user_id: {
      type: String,
      required: false
    }
  })

  if(props.initial) preferred_currency.value = props.initial

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('profiles')
      .update({ preferred_currency: preferred_currency.value })
      .eq('user_id', props.user_id)
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