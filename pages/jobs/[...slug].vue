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
  margin-bottom: $clamp-10;
}
h2{
  margin: $clamp-3 0 $clamp-1 0;
}
ul{
  list-style: decimal-leading-zero;
}
li{
  magin-left:$clamp-9;
  padding-left:$clamp-2;
}
</style>
