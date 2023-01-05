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
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { data: currencies } = await supabase.from('currencies').select('iso, name').eq('available', true)

  const preferred_currency = ref('')

  const { data } = await supabase
    .from('accounts')
    .select('preferred_currency')
    .single()

  if (data) preferred_currency.value = data.preferred_currency

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ preferred_currency: preferred_currency.value })
      .eq('user_id', user.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
