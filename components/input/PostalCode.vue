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
  const postal_code = ref('')

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
  if(props.initial) postal_code.value = props.initial

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ postal_code: postal_code.value })
      .eq('user_id', props.user_id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>