<template>
  <div class="input-wrap">
    <label for="first-name"> 
      First name: 
    </label>
    <input
      type="text"
      v-model="firstName"
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
  const userId = useSupabaseUser()
  const firstName = ref(props.initial)

  const props = defineProps({
    initial: {
      type: String,
      required: false
    }
  })
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      entity: userId.value.id, 
      sender:'components/input/firstName.vue'
    }).users({
      userId: userId.value.id,
      firstName: firstName.value
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
