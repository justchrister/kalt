<template>
  <div class="element select preferred_currency">
    <label for="preferred_currency"> 
      Currency: 
    </label>
    <select v-model="preferred_currency" @change="updateProfile()" :class="state">
      <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.name}}</option>
    </select>
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const preferred_currency = ref('')

  const { data } = await useAsyncData('preferred_currency', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('preferred_currency')
      .eq('user_id', user.value.id)
      .single()
    return data
  })
  console.log(data.value)
  if (data.value) preferred_currency.value = data.value.preferred_currency
  state.value = ''

  let { data: currencies } = await supabase
    .from('currencies')
    .select('iso, name')
    .eq('available', true)
  
  const updateProfile = async () => {
    const { data, error } = await supabase
      .from('accounts')
      .update({ preferred_currency: preferred_currency.value })
      .eq('user_id', user.value.id)
      .select()
      .single()
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
