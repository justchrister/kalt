<template>
  <div>
    <label for="first-name"> 
      First name: 
    </label>
    <input
      type="text"
      v-model="first_name"
      placeholder="First name"
      id="first-name"
      class="atom first-name"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const first_name = ref('')

  let { data } = await supabase.from('accounts').select('first_name').eq('user_id', user.value.id).single()

  if (data) first_name.value = data.first_name
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ first_name: first_name.value }).eq('user_id', user.value.id)
  };

</script>
