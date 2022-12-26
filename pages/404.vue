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
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          
        <Image :images="['/images/dall-e/404_2.png']" /> 
        </div>
        <div class="block">
          <h1>Sadly this page does not exist!</h1>
          <p>Press the menu button, or go back to the previous page.</p>
          </div>
      </div>
    </div>
  </div>
</template>