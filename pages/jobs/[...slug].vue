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
<script setup>
  definePageMeta({
    pagename: 'Candidate'
  })
  useHead({
    title: 'Candidate'
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
main.candidate h2{
  font-size: $clamp-3;
  margin: $clamp-3 0 $clamp-1 0;
}
main.candidate ol,
main.candidate ul{
  list-style: decimal-leading-zero;
}
main.candidate li{
  margin-left:$clamp-4;
  padding-left:$clamp-1;
}
main.candidate h3{
  margin: $clamp-3 0 $clamp-1 0;
}
main.candidate h3 a{
  text-decoration:none;
  font-size: $clamp-2-5;
}
.dark-mode main.candidate h1{
  background-image: url(/media/insignia/insignia-light.svg);
  color: $light;
}

</style>
