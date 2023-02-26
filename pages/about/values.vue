<template>
  <main class="values">
    <navbar :pageTitle="pagename" />
    <div class="headline">
      <h1>Our Values —</h1>
    </div>
    <div class='page'>
      <div class="section">
        <div class="block">
          <h1>Build a new society </h1>

        </div>
        <Cta />
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