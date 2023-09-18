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
    padding:0px $clamp-1-5;
    margin-right:$clamp-0-5;
    border-radius:50%;
    border-color:$pink;
    font-size:80%;
    border-style: dashed;
    &:hover{
      border-color:$dark;
      background-color:white;
    }
  }
</style>