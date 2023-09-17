<template>
  <div class="layout questions">
    <div class="back-button" @click="goBack()">
      ← back
    </div>
    <slot />
  </div>
</template>
<script setup>
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
</script>
<style lang="scss">
.layout.questions .back-button{
  padding: $clamp;
  font-family: $sans-serif;
  font-size:$clamp-2;
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
  background-color:white;
  padding:$clamp $clamp-2;
  border-radius:$clamp;
  font-family: $sans-serif;
  font-size: $clamp-1-5;
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
  margin-top:$clamp;
  margin-right:clamp($unit-min*6, $unit*6, $unit-max*6);
  margin-bottom:$clamp;
  background: $green-60;
  position: relative;
}/*
.dark-mode{
  .layout.questions h1,
  .layout.questions p{
    color:$dark;
  }
  .layout.questions h1{
    background: $blue-80;
  }
  .layout.questions p{
    background: $green-80;
  }
}*/
</style>
