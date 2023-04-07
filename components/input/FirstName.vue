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
    },
    user_id: {
      type: String,
      required: true
    }
  })
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const { data, error } = await supabase
      .from('user_details')
      .insert({ 
        user_id: user.value.id,
        first_name: first_name.value, 
        message_entity_id: user.value.id,
        message_sender: 'components/input/firstName.vue' 
      })
      .select()
    console.log(data)
    console.log(error)

    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
