<template>
  <div class="chartWrap">
    
    <chart-base 
      :labels="labels"

      :data="dataset"
      label="first dataset"/>
    <nav class="pills filters">
      <button @click="updateData(1)">
        24 hours
      </button>
      <button @click="updateData(7)">
        7 days
      </button>
      <button>
        30 days
      </button>
      <button>
        6 months
      </button>
      <button>
        1 year
      </button>
      <button>
        max
      </button>
    </nav>
    <nav class="pills CTA">
      <nuxt-link to="account/sell">
        <button style="background-color:#F4442E;">
          SELL
        </button>
      </nuxt-link>
      <nuxt-link to="account/buy">
        <button style="background-color:#0CF574;">
          BUY
        </button>
      </nuxt-link>
    </nav>
  </div>
</template>
<style scoped>
nav.pills{
  display:inline-block;
}
nav.pills.filters{
  width:80%;}
nav.pills.CTA{
  width:20%;
  text-align:right;
}
nav.pills.CTA button{
  width:40%;
  text-align:center;
}
</style>
<script lang="ts" setup>
// if we have two lines

  const labels = ['one','two','three','wd','121','231','ASDWD','ADWDAW','WDADWA','AWDAWDA','ADWADWA']
  const raw_data =  [1,2,3,2,3,5,6,7,8,9,9,9,9]
  const dataset = ref(raw_data)

const updateData = (slicer) =>{
  dataset.value = raw_data.slice(0,slicer)
}

</script>