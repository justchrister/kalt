<template>
  <div class="impact">
    <div class="image" :id="props.type"></div>
    <p class="title">{{title}}</p>
    <p class="read-more"> <nuxt-link :to="'calculations/'+props.type">read more</nuxt-link></p>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const props = defineProps({
    type: {
      type: String,
      required: true
    }
  })
  const getImpactEquivalent = async (productGWP,euros) => {
    const KWh = euros*0.07; // 1 EUR = 0.07 KWh
    const Co2 = 0.527;    // KWh equivalent CO2 emissions
    const avoidedEmissions=KWh*Co2;
    const equivalent = avoidedEmissions/productGWP
    return Number(equivalent.toFixed(2));
  }
  const getUserPortfolio = async () => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .select()
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(data){
      return {
        'value': data.value,
        'currency': data.value_currency
      }
    } else {
      return {
        'value': 0,
        'currency': 'EUR'
      }
    }
  }
  
  const getExchangeRate = async (from) => {
    if(from === 'EUR') return 1
    const { data, error } = await supabase
      .from('exchange_rates')
      .select()
      .eq('from', )
      .eq('to', 'EUR')
      .limit(1)
      .single()
    if(data){
      return data.rate
    }
  }
  const title = ref('missing type?')
  const portfolio = await getUserPortfolio()
  const exchangeRate = await getExchangeRate(portfolio.currency)
  const eur = portfolio.value*exchangeRate || 1;

  if(props.type === 'fiat') {
    const equivalent = await getImpactEquivalent(0.00012, eur)
    title.value = 'Driving '+equivalent+' km in a Fiat Panda'
  }
  
  if(props.type === 'house') {
    const equivalent = await getImpactEquivalent(0.6, eur)
    title.value = 'Construction of a '+equivalent+' m2 house'
  }
  if(props.type === 'plane') {
    const equivalent = await getImpactEquivalent(0.78, eur)
    title.value = 'Flying '+equivalent+' times to Paris from Tokyo'
  }
  if(props.type == 'avocado') {
    const equivalent = await getImpactEquivalent(0.0005, eur)
    title.value = 'Producing and eating '+equivalent+' avocadoes'
  }
</script>
<style scoped lang="scss">
.impacts{
  margin-top:$big-clamp;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2% 2%;
  grid-auto-flow: row;
}
.impact{
  padding:$clamp 0;
  border-top:$border;
  max-height:$clamp-2-5;
  line-height:$clamp-2-5;;
  display: grid;
  grid-template-columns: $clamp-4 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 0;
  grid-auto-flow: row;
  font-size:120%;
}
.read-more{
  text-align:right;
}

.impact .image{
  height: $clamp-2-5;
  width: $clamp-2-5;
  border-radius:50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  background-image:url('/orbs/grain.png');
}
.impact .image#fiat{
  background-color:$pink-40;
}
.impact .image#house{
  background-color:$blue-40;
}
.impact .image#plane{
  background-color:$red-40;
}
.impact .image#avocado{
  background-color:$green-40;
}
.impact p{
  line-height:$clamp-2-5;;
}/*
.dark-mode{
  .impact{
    border-color:$light;
  }
}*/
</style>