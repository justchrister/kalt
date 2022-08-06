<template>
  <div class="PageWrapper userpage">
    <Kaltmenu pageTitle="Transactions" />
    <div class='page'>
      <div class="section" id="about">
        <div class="block">
          <h2 class="title">
            Transactions for 
          </h2>
          <Transactions />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// {{ this.$auth.user.sub }}
export default {
    head() {
      return{
        title: 'Kalt — Transactions',
        meta: [{
            hid: 'description',
            name: 'description',
            content: 'Best app ever'
        }]
      }
    },
}
</script>

<style>
    
</style>


