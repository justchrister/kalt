<template>
  <div class="input-wrap">
    <label for="postal-code"> 
      Postal code: 
    </label>
    <input
      type="text"
      v-model="postal_code"
      placeholder="Postal code"
      id="postal-code"
      :class="state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const postal_code = ref(props.initial)

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
        postal_code: postal_code.value, 
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