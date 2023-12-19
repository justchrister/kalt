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
    padding:0px sizer(1);
    margin-right:sizer(0.5);
    border-radius:sizer(0.5);
    background:$dark-5;
    border-color:$dark;
    font-size:75%;
    &:hover{
      border-color:$dark;
      background-color:white;
    }
  }
</style>