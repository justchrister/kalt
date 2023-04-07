<template>
  <div class="input-wrap">
    <label for="address-line"> 
      Address line: 
    </label>
    <input
      type="text"
      v-model="address_line_1"
      placeholder="Address line"
      id="address-line"
      :class="'atom address-line '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup lang="ts">
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const address_line_1 = ref(props.initial)
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
        address_line_1: address_line_1.value, 
        message_entity_id: user.value.id,
        message_sender: 'components/input/addressLine.vue' 
      })
      .select()

    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>