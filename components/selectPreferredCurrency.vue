<template>
  <div>
    <label for="preferred_currency"> 
      Preferred currency: 
    </label>
    <select v-model="preferred_currency" @change="updateProfile()" :class="state">
      <option v-for="preferred_currency of currencies" :value="preferred_currency.iso" :key="preferred_currency.iso">{{preferred_currency.name}}</option>
    </select>
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const preferred_currency = ref('')
  const state = ref('normal')

  let { data } = await supabase.from('accounts').select('preferred_currency').eq('user_id', user.value.id).single()
  if (data) preferred_currency.value = data.preferred_currency

  let { data: currencies } = await supabase.from('currencies').select('iso, currency_name').eq('available', true)
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ preferred_currency: preferred_currency.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
