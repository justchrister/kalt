<template>
  <div class="layout focused">
    <div class="back-button" @click="goBack()">
      <omoji emoji="←" /> back
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
</script>
<style scoped lang="scss">
.layout.focused .back-button{
  padding: $big-clamp-half 0 0 $big-clamp-half;
  font-family: $sans-serif;
  font-size:clamp($unit-min*2, $unit*2, $unit-max*2);
  font-weight:300;
  line-height: 150%;
  font-display: optional;
  position:fixed;
}
.layout.focused .back-button:hover{
  cursor:pointer;
}
.layout.focused .section{
  padding-top:0;
}
</style>
