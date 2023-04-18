<template>
  <main class="candidate">
    <block>
      <ContentDoc>
        <template #not-found>
          <not-found />
        </template>
      </ContentDoc>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Candidate'
  })
  useHead({
    title: 'Candidate',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>
<style lang="scss">
main.candidate h1{
  background-image: url(/media/insignia/insignia.svg);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  color: $dark;
  height: $clamp-15;
  line-height: 150%;
  line-height: $clamp-15;
  text-align: center;
  width: 100%;
}
</style>
