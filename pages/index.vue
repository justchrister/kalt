
<template>
  <main>
    <div class="video-container">
      <h1>
        Invest in the <strong>future</strong>, today. <br/> <nuxt-link to="/invite/request/amount"> start → </nuxt-link>
      </h1>
      <video src="/videos/film-3.mp4" class="background-video" autoplay muted loop></video>
    </div>
    <block>
      <h2>Real impact</h2>
      <p>
        We use cutting-edge technology to make your money work for you, while contributing to a sustainable future for everyone.
      </p>
      <p>
        By investing in what you believe in, you can be sure that your money is aligned with your values.
      </p>
      <p>
        Our funds
      </p>
      <pill text="energy" to="funds/ffe" />
      <pill text="art" to="funds/art" />
      <pill text="housing" to="funds/ah" />
      <pill text="small business" to="funds/smb" />
    </block>
    <block>
      <h2>Want to work with us?</h2>
      <p>
        We are looking for exceptionally talented people to join us in building the next era of capitalism. In an academic environment, where the focus is delivery. 
      </p>
      <p> 
        <nuxt-link to="/careers">Learn more →</nuxt-link>
      </p>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Homepage'
  })
  useSeoMeta({
    title: 'Kalt',
    ogTitle: 'Kalt — Real assets, real impact',
    description: 'Building the next era of capitalism.',
    ogDescription: 'Building the next era of capitalism.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>
<style scoped lang="scss">
h1 {
  font-size:5vw;
  padding-top:20vw;
  padding-left:4vw;
  color:$dark;
}
.video-container{
  display:block;
  position: relative;
  margin:sizer(7) 10vw sizer(4) 10vw;
  width:80vw;
  height:40vw;
  box-sizing: border-box;
}
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: sizer(2); 
  z-index: -1;
}
  main{
    padding-top:0;
  }
</style>
<style lang="scss">
  body{
    animation: backgroundColorAnimation  5s infinite;
  }
</style>