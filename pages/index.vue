
<template>
  <main>
    <div class="video-container" @click="navigateTo('/invite/request/amount')">
      <h1>
        <span>Invest</span> <span>in</span> <span>the</span> <span><strong>future</strong>,</span> <span>today.</span> <br/> <span><nuxt-link to="/invite/request/amount"> start → </nuxt-link></span>
      </h1>
      <video src="/videos/film-3.mp4" class="background-video" autoplay muted loop></video>
    </div>
    <block>
      <h2>Real impact</h2>
      <p>
        Our innovative technology lets you to grow your wealth while building a more sustainable future for everyone.</p>
      <p>
        By investing in what you believe in, you can be sure that your money is aligned with your values.
      </p>
      <p>
        Our funds:
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
    border-radius: sizer(0.8); 
    z-index: -1;
  }
  @keyframes moveUp {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

  h1 span {
    display: inline-block;
    opacity: 0;
    animation: moveUp 0.5s forwards;
  }

  // Use SCSS loop to apply animation delay
  @for $i from 1 through 6 {
    h1 span:nth-child(#{$i}) {
      animation-delay: 0.1s * $i;
    }
  }
  main{
    padding-top:0;
  }
</style>