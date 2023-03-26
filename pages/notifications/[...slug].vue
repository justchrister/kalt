<template>
  <div class="page-wrap notification">
    <div class="page">
      <div class="section">
        <ContentDoc>
          <template #not-found>
            <div class="block">
              <Image :images="['/media/images/dall-e/404_2.png']" /> 
            </div>
            <div class="block">
              <h1>Sadly this page does not exist!</h1>
              <h1>Press the menu button, or go back to the previous page.</h1>
              <h1>Press the menu button, or go back to the previous page.</h1>
            </div>
          </template>
        </ContentDoc>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const pagename = 'Notification';
  const title = 'Kalt — ' + pagename;

  useHead({
    title,
    meta: [{
      name: 'description',
      content: "Make money, make a difference."
    }]
  })
</script>
<style lang="scss">
.page-wrap.notification h1{
  font-family:$sans-serif;
}
</style>