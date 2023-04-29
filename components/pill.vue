<template>
  <nuxt-link :to="props.to" v-if="props.to">
    <div class="pill">
      <omoji emoji="props.omoji" v-if="props.omoji"/> {{props.text}}
    </div>
  </nuxt-link>
  <div class="pill" v-else>
    {{props.text}}
  </div>
</template>
<script setup>
  const props = defineProps({
    to: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: true
    },
    omoji:{
      type: String,
      required: false
    }
  })
</script>
<style scoped lang="scss">
.pill{
  border:$border-width solid $dark;
  display:inline-block;
  padding:0px $clamp-2;
  margin-top:$clamp-2;
  margin-right:$clamp;
  &:hover{
    border-radius:100%;
    background: linear-gradient(318deg, $light, $green-20, $light,);
    background-size: 1200% 1200%;
    -webkit-animation: gradient 4.20s ease infinite;
    -moz-animation: gradient 4.20s ease infinite;
    animation: gradient 4.20s ease infinite;
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