<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Homepage" />
    <div class='page'>
      <div class="section" id="about">
        <div class="frame">
          <div class="image" style="background-image:url(https://cdn.kalt.co/media/homepage_01_min.jpg);">
          </div>
          <div class="image" style="background-image:url(https://cdn.kalt.co/media/homepage_02_min.jpg);">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Time to start building your residual income!
          </h2>
          <p>
            Through practical solutions — rather than theoretical — we are working to make everywhere more inclusive and interesting. We make our decisions based on a set of politially agnostic values, and are doing our best to have a positive impact on everyone.
          </p>
        </div>
        <a href="mailto:hello@kalt.co">
          <button class="read_more" tabindex="-1">contact</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Kaltmenu from '../components/kaltmenu.vue';

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


