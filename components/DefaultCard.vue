<template>
  <div class="card" v-if="card">
    <div :class="checkBrand(card.card_number)"></div>
    <div class="details">  {{ "•••• •••• •••• " + card.card_number.toString().slice(-4) }}  </div>
    <div :class="'default '+card.default"> <span class="set"> set </span> default  </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()

  const { data: card } = await useLazyAsyncData('card', async () => {
    const { data, error } = await supabase
      .from('cards')
      .select()
      .eq('default', true)
      .order('modified_at', { ascending: false })
      .single()
    return data
  })

  const checkBrand = (brand_id) => {
    let first_digit = brand_id.toString().slice(0,  1);
    if(first_digit==='2') return "logo mastercard"
    if(first_digit==='3') return "logo amex"
    if(first_digit==='5') return "logo mastercard"
    if(first_digit==='4') return "logo visa"
    if(first_digit==='6') return "logo"
    return "ehm what?"
  }

</script>
