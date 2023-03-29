<template>
  <div class="cta">
    <nuxt-link to="/portfolio/buy">
      <button  :class="animatedClass" tabindex="-1">lets invest</button>
    </nuxt-link>
    <nuxt-link v-if="props.showDivest" to="/portfolio/sell">or divest</nuxt-link>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    showDivest: {
      default: false,
      type: Boolean,
      required: false
    },
    animated: {
      default: true,
      type: Boolean,
      required: false
    }
  })
  let animatedClass
  if(props.animated){
    animatedClass = "green-gradient"
  }
</script>
<style scoped lang="scss">
.cta{
  text-align: center;
  .green-gradient{
    background: linear-gradient(318deg, $light, $light  , $blue-20, $light, $light);
    background-size: 1200% 1200%;
    -webkit-animation: gradient 9s ease infinite;
    -moz-animation: gradient 9s ease infinite;
    animation: gradient 9s ease infinite;
  }
  a{
    text-decoration: none;
  }
}

@-webkit-keyframes gradient {
  0%{background-position:0% 10%}
  50%{background-position:100% 91%}
  100%{background-position:0% 10%}
}
@-moz-keyframes gradient {
  0%{background-position:0% 10%}
  50%{background-position:100% 91%}
  100%{background-position:0% 10%}
}
@keyframes gradient {
  0%{background-position:0% 10%}
  50%{background-position:100% 91%}
  100%{background-position:0% 10%}
}
</style>