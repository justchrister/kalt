
<template>
  <main>
    <block width="extra-wide" padding="5" video="/videos/film-3.mp4">
      <h1><span>A</span> <span>purpose</span><span>-</span><span>driven</span> <br/><span>investment</span> <span>platform</span><span>.</span>
      </h1>
      <div class="columns-2">
        <div class="request" @click="navigateTo('invite/request/amount')">
          <nuxt-link to="invite/request/amount">Join waitlist ↗</nuxt-link>
        </div>
        <div class="learn" @click="navigateTo('/vision')">
          <u>Our vision</u>
        </div>
      </div>
    </block>
    <block>
      <h2>Our innovative technology lets you to grow your wealth while investing in things that matter to you.</h2>
      <p>
        The only way to have actual lasting impact is to use market forces to drive a change. We call it the next era of capitalism. 
        You can expect high returns, moderate risk, and complete transparency. 
      </p>
      <p>
        Our funds:
      </p>
      <pill text="energy" to="funds/energy" />
      <pill text="art" to="funds/art" />
      <pill text="housing" to="funds/housing" />
      <pill text="small business" to="funds/small-business" />
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
  main{
    padding-top:sizer(8);
  }
  .content{
    bottom:0;
    position:absolute;
    padding:sizer(4);
  }
  h1 {
    font-size:sizer(3.5);
    color:$dark;
    font-weight:500;
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
  @for $i from 1 through 9 {
    h1 span:nth-child(#{$i}) {
      animation-delay: 0.08s * $i;
    }
  }

  .columns-2{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: sizer(.5);
    width:sizer(30);
    *{
      font-size:sizer(1.5);
    }
    .learn:hover{
      text-decoration:underline;
      cursor: pointer;
    }
    .request a{
      border: sizer(0.1) solid $dark;
      text-decoration: none;
      color:dark(90%);
      padding:sizer(.7) sizer(1.8);
      border-radius:50%;
      text-align:center;
      cursor:pointer;
      &:hover{
        background-color:rgba($light, 0.2)
      }
    }
  }
</style>