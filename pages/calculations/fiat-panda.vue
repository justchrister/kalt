<template>
  <main>
    <block>
      <p class="function">
        ({{ KWh }} × {{Co2}}) ÷ {{ avocadoGWP }} ≈ {{avocadoEquivalent}} km in 🚗
      </p>
    </block>
      <block>
      <h1 class="sans-serif">
        Estimating the avocado equivalent in terms of CO2 emissions savings from renewable energy generation
      </h1>
      <p>
        To create a rough estimate of the conversion from KWh generated from renewable energies to the emissions associated with producing, shipping, and recycling avocadoes, we follow these steps:
      </p>
      <ol>
        <li>
          Calculate the emissions saved by generating renewable energy. On average, 1 KWh of electricity generates about {{Co2}} kg of CO2 emissions. So, {{KWh}} KWh of renewable energy would save approximately <code>{{KWh}} × {{Co2}} = {{avoidedEmission}} kg</code> of CO2 emissions. <a href="#citations"><sup>1</sup></a>
        </li>
        <li>
          Determine the emissions associated with one avocado. According to a study, the production, shipping, and disposal of one avocado is responsible for roughly 2 kg of CO2 generated emissions. <a href="#citations"><sup>2</sup></a>
        </li>
        <li>
          Calculate the equivalent number of avocadoes. Divide the total avoided emissions ({{ avoidedEmission }} kg of CO2) by the emissions per avocado ({{ avocadoGWP }} kg of CO2/avocado): <code>{{ avoidedEmission }} ÷ {{avocadoGWP}} = {{avocadoEquivalent}}</code>.
        </li>
      </ol>
      <p>
        Based on this rough estimate, generating {{KWh}} KWh of renewable energy is equivalent to the emissions associated with producing, shipping, and recycling about {{avocadoEquivalent}} avocadoes. Keep in mind this is an extremely rough estimate, based on averages, that does not account for where the avocado was produced or where you live. The actual emissions associated with producing, shipping, and recycling an avocado can vary widely. But this is a good starting point for understanding the emissions associated with renewable energy generation, and the impact you are having. 
      </p>
    </block>
    <block>
      <h3 id="citations">
        citations
      </h3>
      1 — U.S. Environmental Protection Agency (EPA) eGRID data, 2018 (<a href="https://www.epa.gov/egrid" target="_blank">https://www.epa.gov/egrid</a>)
      <br/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Fiat panda',
    middleware: 'auth'
  })
  useHead({
    title: 'Fiat panda'
  })
  const KWh=ref(900);
  const Co2=ref(0.527); // KWh equivalent CO2 emissions
  const avoidedEmission=ref(KWh.value*Co2.value);
  const avocadoGWP = ref(0.42313); // weforum.org/agenda/2020/02/avocado-environment-cost-food-mexico/
  const avocadoEquivalent = ref(avoidedEmission.value/avocadoGWP.value)

</script>
<style scoped lang="scss">
  
ol{
  margin:$clamp-1 0;
  list-style: decimal-leading-zero;
}
li{
  margin:$clamp-0-5 $clamp-5;
  &::marker{
    font-size:85%;
    font-family:$monospace;
  }
}
code{
  font-family:$monospace;
  font-size:80%;
  background:rgba($dark-20, 0.5);
  border:$border;
  border-color:$dark-40;
  border-radius:2px;
  padding:0 $clamp-0-5;
}
.function{
  text-align:center;
  font-size:$clamp-3;
  font-family:$monospace;
}
sup{
  &:before{
    content:'[ ';
  }
  &:after{
    content:' ]';
  }
}
sup{
  text-decoration: none;
}
</style>