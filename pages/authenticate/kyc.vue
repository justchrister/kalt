<template>
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
            <button> <a href="../username?invest=yes"> Next </a> </button>
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


