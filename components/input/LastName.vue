<template>
  <div class="input-wrap">
    <label for="last-name"> 
      Last name: 
    </label>
    <input
      type="text"
      v-model="last_name"
      placeholder="Last name"
      id="last-name"
      :class="'atom last-name '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const last_name = ref(props.initial)

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
        last_name: last_name.value, 
        message_entity_id: user.value.id,
        message_sender: 'components/input/lastName.vue' 
      })
      .select()

    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
