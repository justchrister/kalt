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

<script setup lang="ts">
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const props = defineProps({
    initial: {
      type: String,
      required: false
    }
  })
  
  const addressLine1 = ref(props.initial)
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      sender:'components/input/addressLine.vue',
      id: user.id
    }).users({
      addressLine1: addressLine1.value,   
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>