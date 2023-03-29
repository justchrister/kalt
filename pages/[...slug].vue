<template>
  <div class="page-wrap">
    <div class="block">
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
    <cta/>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'questions',
  });
</script>