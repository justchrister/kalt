<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Authenticate" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Hello!
          </h2>
          <form>
            <label>First name</label>
            <input type="text" placeholder="Satoshi">
            <label>Last name</label>
            <input type="text" placeholder="Nakamura">
            <label>Address</label>
            <input type="text" placeholder="Nakamura">
            <button> <a href="../@username"> Next </a> </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Kaltmenu from '@/components/kaltmenu.vue';

export default {
    head() {
        return{
            title: 'Kalt — Homepage',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'Best app ever'
            }]
        }
    },
    components: {
      Kaltmenu,
    }, 
}
</script>

<style>
    
</style>


