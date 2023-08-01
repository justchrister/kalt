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
    const { error, data } = await pub(supabase, {
      sender:'components/input/country.vue', 
      entity: user.value.id
    }).userDetails({
      userId: user.value.id,
      country: country.value
    });
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