<template>
  <div class="input-wrap">
    <label for="last-name"> 
      Last name: 
    </label>
    <input
      type="text"
      v-model="lastName"
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
  const userId = useSupabaseUser()
  const lastName = ref(props.initial)

  const props = defineProps({
    initial: {
      type: String,
      required: false
    }
  })
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const { error, data } = await pub(supabase, {
      sender: 'components/input/lastName.vue',
      entity: userId.value.id
    }).userDetails({
      userId: userId.value.id,
      lastName: lastName.value
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
