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
  const birthdate = ref(props.initial)
  state.value = ''
  const updateProfile = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      id: user.id,
      sender:'components/input/birthdate.vue'
    }).users({
      birthdate: birthdate.value, 
    });
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>