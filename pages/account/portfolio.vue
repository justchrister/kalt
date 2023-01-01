
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <tabs />
          <chart-portfolio 
            :labels="labels"

            :data="data"
            label="first dataset"
            
            :data2="data2"
            label2="second dataset"/>
            <div class="custom-portfolio-card">

            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const pagename = 'Transactions';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  const labels = ['one','two','three','wd','121','231','ASDWD','ADWDAW','WDADWA','AWDAWDA','ADWADWA']
  const data =  [1,2,3,2,3,5,6,7,8,9,9,9,9]
  const data2 = [6,4,2,1,7,9,0,5,3,1,3,5,7]

</script>
<style scoped>
.green{ color:green; }
</style>