<template>
  <div class="element select currency">
    <label for="preferred_currency"> 
      Preferred currency: 
    </label>
    <select v-model="preferred_currency" @change="updateProfile()" :class="state">
      <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.name}}</option>
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

  let { data: currencies } = await supabase.from('currencies').select('iso, name').eq('available', true)

  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ preferred_currency: preferred_currency.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
