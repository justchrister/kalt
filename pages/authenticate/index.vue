<template :title="Authenticate">
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Hello!
          </h2>
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
</template>

<script>
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
}
</script>

<style>
    
</style>


