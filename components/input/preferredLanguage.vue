<template>
  <div class="element select preferred_language">
    <label for="preferred_language"> 
      Language: 
    </label>
    <select v-model="preferred_language" @change="updateProfile()" :class="state">
      <option v-for="country of languages" :value="country.iso6393" :key="country.iso6393">{{country.name}}</option>
    </select>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const { data: languages } = await supabase.from('languages').select('iso6393, name').eq('available', true)

  const preferred_language = ref('')

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
  if(props.initial) preferred_language.value = props.initial

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ preferred_language: preferred_language.value })
      .eq('user_id', props.user_id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
<style scoped lang="scss">
.element.select{
  margin-top: $clamp;
}
</style>