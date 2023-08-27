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
        'currency': data.valueCurrency
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
      .from('topic_exchangeRates')
      .select()
      .eq('from', from)
      .eq('to', 'EUR')
      .limit(1)
      .single()
    if(data){
      return data.rate
    }
  }

    // Functions
    const eurToEnergyGWh = (eur) => {
      return eur / 47000;  // Assuming 47,000 €/GWh
    };

    const fiat = (co2Avoided) => {
      return (co2Avoided * 1e6) / 120; // 120 grams of CO2 per km
    };

    const plane = (co2Avoided) => {
      return co2Avoided / 1600; // 1600 kg CO2 per flight
    };

    const avocados = (co2Avoided) => {
      return (co2Avoided * 1e6) / 2000; // 2 kg CO2 per avocado produced and recycled
    };

    const title = ref('missing type?');
    const portfolio = await getUserPortfolio();
    const exchangeRate = await getExchangeRate(portfolio.currency);
    const eur = portfolio.value * exchangeRate || 1;

    const energyInGWh = eurToEnergyGWh(eur);
    const co2Avoided = energyInGWh * 1000; // 1000 metric tons of CO2 per GWh

    if(props.type === 'fiat') {
      const equivalent = fiat(co2Avoided).toFixed(0);
      title.value = `Driving ${equivalent} km in a Fiat Panda`;
    }
    if(props.type === 'plane') {
      const equivalent = plane(co2Avoided).toFixed(2);
      title.value = 'Flying '+equivalent+' times to Paris from Tokyo';
    }
    if(props.type === 'avocado') {
      const equivalent = avocados(co2Avoided).toFixed(0);
      title.value = `Producing and eating ${equivalent} avocados`;
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