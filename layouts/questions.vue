<template>
  <div class="layout questions">
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
<style lang="scss">
.layout.questions .back-button{
  padding: $big-clamp-half 0 0 $big-clamp-half;
  font-family: $sans-serif;
  font-size:clamp($unit-min*2, $unit*2, $unit-max*2);
  font-weight:normal;
  line-height: 150%;
  font-display: optional;
  position:fixed;
}
.layout.questions .back-button:hover{
  cursor:pointer;
}
.layout.questions .section{
  padding-top:0;
}
.layout.questions p,
.layout.questions h1{
  background-color:#fff;
  padding:clamp($unit-min, $unit, $unit-max) clamp($unit-min*2, $unit*2, $unit-max*2);
  border-radius:clamp($unit-min, $unit, $unit-max);
  font-family: $sans-serif;
  font-size: clamp($unit-min*1.5, $unit*1.5, $unit-max*1.5);
  font-weight:normal;
  line-height: 150%;
  font-display: optional;
  display:inline-block;
  width:auto;
}
.layout.questions h1{
  margin-left:clamp($unit-min*6, $unit*6, $unit-max*6);
  float:right;
  background: $blue-60;
}
.layout.questions p{
  margin-top:clamp($unit-min, $unit, $unit-max);
  margin-right:clamp($unit-min*6, $unit*6, $unit-max*6);
  margin-bottom:clamp($unit-min, $unit, $unit-max);
  background: $green-60;
  position: relative;
}
</style>
