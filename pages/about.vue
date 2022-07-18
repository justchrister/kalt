<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="About" />
    <div class='page'>
      <div class="section">
        <div class="body">
          <p>
            The goal of the visual profile is to communicate ideas as clearly as possible, while not being restrictive. This is achived in combination with the <a href="stylebook.html">Kalt — Stylebook</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kaltmenu from '../components/kaltmenu.vue';

export default {
    head() {
        return{
            title: 'Kalt — About',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'Best app ever'
            }]
        }
    },
}
</script>

<style scoped>

</style>


