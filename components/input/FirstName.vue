<template>
  <div class="input-wrap">
    <label for="first-name"> 
      First name: 
    </label>
    <input
      type="text"
      v-model="first_name"
      placeholder="First name"
      id="first-name"
      :class="'atom first-name '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const first_name = ref('')

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
  if(props.initial) first_name.value = props.initial

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('profiles')
      .update({ first_name: first_name.value })
      .eq('user_id', props.user_id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
