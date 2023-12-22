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
  const userId = useSupabaseUser()
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
    const error = await pub(supabase, {
      entity: userId.value.id,
      sender:'components/input/city.vue'
    }).users({
      userId: userId.value.id,
      city: city.value  
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>