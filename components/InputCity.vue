<template>
  <div>
    <label for="city"> 
      City: 
    </label>
    <input
      type="text"
      v-model="city"
      placeholder="City"
      id="city"
      class="atom city"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const city = ref('')

  let { data } = await supabase.from('accounts').select('city').eq('user_id', user.value.id).single()

  if (data) city.value = data.city
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ city: city.value }).eq('user_id', user.value.id)
  };

</script>
