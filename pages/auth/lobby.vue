
<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/audun-alvestad/waiting-room.png" />
      <frame-image src="/media/images/apollo-celebration.jpg" />
    </frame-wrap>
    <block margin="half">
      <h1> One small step for you, a big step for mankind. </h1>
      <p> You are just one step away from investing in the future of fossil-free energy. Check your email for our invitation. </p>
      <!--
      <p>As I sat in the dentist's lobby, the silence was almost deafening. I couldn't shake the feeling of anxiousness as I stared at my phone, willing the e-mail verification to appear. Time seemed to crawl by as I waited, and I couldn't help but feel like I was trapped in some sort of purgatory. The only sound in the room was the occasional typing of the receptionist, a constant reminder of the passing time. I tried to distract myself, but it was no use. The e-mail was all I could think about. And then, finally, it arrived. The notification lit up my screen, and I let out a sigh of relief. The waiting was over, and I could finally escape this hellish limbo.<br> — Hemmingway, GPT-3</p>-->
    </block>
    <block margin="half">
      <nuxt-link to="/auth" >
          <button tabindex="-1">sign in</button>
      </nuxt-link>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Lobby'
  })
  useHead({
    title: 'Lobby',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>