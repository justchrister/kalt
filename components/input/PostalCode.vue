<template>
  <div class="input-wrap">
    <label for="postal-code"> 
      Postal code: 
    </label>
    <input
      type="text"
      v-model="postalCode"
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
  const userId = useSupabaseUser()
  const postalCode = ref(props.initial)

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
      sender:'components/input/lastName.vue',
      entity: userId.value.id
    }).users({
        userId: userId.value.id,
        postalCode: postalCode.value
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>