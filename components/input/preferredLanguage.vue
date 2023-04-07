<template>
  <div class="input-wrap">
    <label for="language"> 
      Language: 
    </label>
    <select v-model="language" @change="updateProfile()" :class="state">
      <option v-for="country of languages" :value="country.iso6393" :key="country.iso6393">{{country.name}}</option>
    </select>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const { data: languages } = await supabase.from('languages').select('iso6393, name')

  const language = ref('')

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
        language: language.value, 
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