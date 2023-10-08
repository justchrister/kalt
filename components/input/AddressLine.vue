<template>
  <div class="input-wrap">
    <label for="address-line"> 
      Address line: 
    </label>
    <input
      type="text"
      v-model="addressLine1"
      placeholder="Address line"
      id="address-line"
      :class="state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const addressLine1 = ref(props.initial)
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
      sender:'components/input/addressLine.vue',
      entity: userId.value.id
    }).users({
      userId: userId.value.id,
      addressLine1: addressLine1.value,   
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>