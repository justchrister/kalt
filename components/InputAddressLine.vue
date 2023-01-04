<template>
  <div class="element input text">
    <label for="address-line"> 
      Address line: 
    </label>
    <input
      type="text"
      v-model="address_line"
      placeholder="Address line"
      id="address-line"
      class="atom address-line"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()

  const user = useSupabaseUser()

  const address_line = ref('')

  let { data } = await supabase.from('accounts').select('address_line').eq('user_id', user.value.id).single()

  if (data) address_line.value = data.address_line
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ address_line: address_line.value }).eq('user_id', user.value.id)
  };

</script>
