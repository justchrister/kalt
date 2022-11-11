<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Homepage" />
    <div class='page'>
      <div class="section" id="about">
        <div class="frame">
          <div class="image" style="background-image:url(/images/frontpage.webp); margin-left:0">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Make money, make a difference!
          </h2>
          <p>
            Through practical solutions — rather than theoretical — we are working to make everywhere more inclusive and interesting. We make our decisions based on a set of politially agnostic values, and are doing our best to have a positive impact on everyone.
          </p>
        </div>
        <Cta />
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