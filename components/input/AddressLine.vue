<template>
  <div class="input-wrap">
    <label for="address-line"> 
      Address line: 
    </label>
    <input
      type="text"
      v-model="address_line"
      placeholder="Address line"
      id="address-line"
      :class="'atom address-line '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const address_line = ref('')

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
  if(props.initial) address_line.value = props.initial

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('profiles')
      .update({ address_line: address_line.value })
      .eq('user_id', props.user_id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>