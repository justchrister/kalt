<template>
  <div class="element input text">
    <label class="atom" for="postal-code"> 
      Postal code: 
    </label>
    <input
      class="atom"
      type="text"
      v-model="postal_code"
      placeholder="Postal code"
      id="postal-code"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();
  const postal_code = ref('')

  let { data } = await supabase
    .from('accounts')
    .select('postal_code')
    .eq('user_id', user.value.id)
    .single()
  if (data) postal_code.value = data.postal_code
  
  const updateProfile = async () => {
    const { error } = await supabase
      .from('accounts')
      .update({ postal_code: postal_code.value })
      .eq('user_id', user.value.id)
  };

</script>
