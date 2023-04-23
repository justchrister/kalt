<template>
  <div>
  <label>Language: </label>
  <nuxt-link to="/select/currency">
    <span class="iso">{{data.iso}}</span>
    <span>{{data.name}}</span>
    <span>→</span>
  </nuxt-link>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getPreferredCurrency = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('currency')
      .eq('user_id', user.value.id)
      .limit(1)
      .single()
    return data.currency
  }

  const currency = await getPreferredCurrency();

  const { data, error } = await supabase
    .from('currencies')
    .select()
    .eq('enabled', true)
    .eq('iso', currency)
    .limit(1)
    .single()
</script>
<style scoped lang="scss">
  a{
    max-width:$clamp-20;
    padding:$clamp $clamp-2;
    display:grid;
    grid-template-columns: $clamp-4 4fr $clamp;
    border:$border;
    text-decoration:none;
    &:hover{
      cursor: pointer;
      background:white;
    }
  }
  .iso{
    font-family:"Kalt Monospace", monospace;
    font-size:75%;
  }
</style>