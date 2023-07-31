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
  const user = useSupabaseUser()
  const { data: languages } = await supabase.from('languages').select('iso6393, name')

  const language = ref(props.initial)

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
        userId: user.value.id,
        language: language.value,
        message_entity_id: user.value.id,
        message_sender: 'components/input/preferredLanguage.vue' 
      })
      .select()

    if(error){
      state.value="error"
      ok.log('error', 'could not update language preferrence: ', error)
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