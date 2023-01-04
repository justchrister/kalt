
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <tabs />
          <chart-portfolio />
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
  
</script>
<style scoped>
.green{ color:green; }
</style>