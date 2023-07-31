<template>
  <div class="input-wrap">
    <label for="city"> 
      City: 
    </label>
    <input
      type="text"
      v-model="city"
      placeholder="City"
      id="city"
      :class="'atom city '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const props = defineProps({
    initial: {
      type: String,
      required: false
    }
  })
  const city = ref(props.initial)
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const { data, error } = await supabase
      .from('user_details')
      .insert({ 
        userId: user.value.id,
        city: city.value, 
        message_entity_id: user.value.id,
        message_sender: 'components/input/city.vue' 
      })
      .select()

    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>