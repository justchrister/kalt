
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="block">
      </div>
      <div class="block">
        <h1>Sadly this page does not exist!</h1>
        <p>Press the menu button, or go back to the previous page.</p>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = '404';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  var errormsg = ref('');
  
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

</script>