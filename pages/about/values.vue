<template>
  <main class="values">
    <navbar :pageTitle="pagename" />
    <div class="intro">
      <div class="section">
        <div class="block">
          <h3>Our values and goals</h3>
          <p>
            All humans are our stakeholders, we try to find a slightly better solution to each challenge we find. Trying to make a slightly better world for everyone at each turn.
          </p>
        </div>
      </div>
    </div>
    <div class='page'>
      <div class="section">
        <div class="block">
          <h4>Create meaningful impact</h4>
          <p>
            Impact and wealth creation are not in opposition, they should work together, where wealth creation creates more impact and vice versa.
          </p>
        </div>
        <div class="block">
          <h4>Aim for clarity</h4>
          <p>
            Everyone should understand what they are investing in, the risks, and how its contributing to the wealth creation.
          </p>
        </div>
        <div class="block">
          <h4>Simple first, then powerful</h4>
          <p>
            Focus on simplicity in functionality before adding a bunch of shiny features that might not accomplish much. Skip the nonesense and jargon.
          </p>
        </div>
        <div class="block">
          <h4>Build for people</h4>
          <p>
            Both our customer facing solution, such as this website, but also the infrastructure we are creating globally, needs to be built for the people actually living there.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = "Our values";
  const title = "Kalt — " + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
</script>
<style scoped>
.intro{
  background: #0CF574;
}
</style>