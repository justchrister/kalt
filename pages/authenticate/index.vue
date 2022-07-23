<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Authenticate" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <form>
            <label>Username</label>
            <input type="text" placeholder="elonmusk@sec.gov">
            <label>Password</label>
            <input type="password" placeholder="Supersafe<3">
            <button> <a href="../authenticate/kyc"> Next </a> </button>
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


