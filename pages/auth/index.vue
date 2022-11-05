<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Authentication" />
    <div class='page'>
      <div class="section" id="about">
          <form>
              <input type="text"></input>
              <input type="password"></input>
              <input type="button"></input>
            </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    head() {
        return{
            title: 'Kalt — Authentication',
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


