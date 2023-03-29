<template>
  <main>
    
    <div class="page">
      <div class="block">
        <h3> Add a card to start investing </h3>
        <card-add/>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = "Add card";
  const title = "Kalt — " + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  definePageMeta({
    middleware: 'auth'
  });

</script>