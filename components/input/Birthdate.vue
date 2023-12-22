<template>
  <div class="input-wrap">
    <label for="birthdate"> 
      Birthdate: 
    </label>
    <input
      type="date"
      v-model="birthdate"
      placeholder="Birthdate"
      id="birthdate"
      :class="'atom birthdate '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const birthdate = ref(props.initial)

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
      sender:'components/input/birthdate.vue'
    }).users({
      userId: userId.value.id,
      birthdate: birthdate.value, 
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>