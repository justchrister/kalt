<template>
  <main class="values">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3>Our goals </h3>
          <div class="block">
            <h4> Create meaningful impact </h4>
            <p> Impact and wealth creation are not in opposition, they can work together, where wealth creation creates more impact and vice versa. </p>
          </div>
          <div class="block">
            <h4> Aim for clarity </h4>
            <p> Everyone should understand what they are investing in, the risks, and how its contributing to the wealth creation. </p>
          </div>
          <div class="block">
            <h4> Simple first, then powerful </h4>
            <p> Focus on simplicity in functionality before adding a bunch of features. </p>
          </div>
          <div class="block">
            <h4> Build for people </h4>
            <p> Skip the jargon, use words and phrases anyone can understand. </p>
          </div>
        </div>
        <Cta />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = "Our goals";
  const title = "Kalt — " + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
</script>
