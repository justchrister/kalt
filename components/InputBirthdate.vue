<template>
  <div>
    <label for="birthdate"> 
      Birthdate: 
    </label>
    <input
      type="date"
      v-model="birthdate"
      placeholder="Birthdate"
      id="birthdate"
      class="atom birthdate"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const birthdate = ref('')

  let { data } = await supabase.from('accounts').select('birthdate').eq('user_id', user.value.id).single()

  if (data) birthdate.value = data.birthdate
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ birthdate: birthdate.value }).eq('user_id', user.value.id)
  };

</script>
