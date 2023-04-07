<template>
  <div class="input-wrap">
    <label for="country"> 
      Country: 
    </label>
    <select v-model="country" @change="updateProfile()" :class="state">
      <option v-for="country of countries" :value="country.iso2" :key="country.iso2">{{country.name}}</option>
    </select>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { data: countries } = await supabase.from('countries').select('iso2, name')
  const country = ref(props.initial)

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
      .from('user_details')
      .insert({ 
        user_id: user.value.id,
        country: country.value, 
        message_entity_id: user.value.id,
        message_sender: 'components/input/country.vue' 
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