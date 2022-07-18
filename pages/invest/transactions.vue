<template>
    <div class='page'>

      <!--
        Symbolic logo
      -->
      <div class="section" id="logomark">
				<div class="block">
					<svg version="1.1" id="Insignia" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 7113.2 2048.5" style="enable-background:new 0 0 7113.2 2048.5;" xml:space="preserve">
					<circle id="Inner" class="insignia" cx="3565.7" cy="1024.3" r="1022.3"/>
					<ellipse id="Middle" class="insignia" cx="3556.6" cy="1024.3" rx="2527.9" ry="1022.3"/>
					<ellipse id="Outer" class="insignia" cx="3556.6" cy="1024.3" rx="3554.6" ry="1022.3"/>
					</svg>
				</div>
			</div>

      <!--
        Featured section
      -->
      <div class="section" id="about">
        <div class="frame">
          <div class="image" style="background-image:url(https://cdn.kalt.co/media/homepage_01_min.jpg);">
          </div>
          <div class="image" style="background-image:url(https://cdn.kalt.co/media/homepage_02_min.jpg);">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Designing long-term solutions to tough challenges.
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
</template>

<script>
export default {
    created() {
      this.$store.commit('page/setName', 'Transactions')
    },
    head() {
        return{
            title: 'Kalt — ' + this.$store.state['page'].name,
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


