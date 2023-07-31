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
  const user = useSupabaseUser()
  const first_name = ref(props.initial)

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
        userId: user.value.id,
        first_name: first_name.value, 
        message_entity: user.value.id,
        message_sender: 'components/input/firstName.vue' 
      })
      .select()

    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
