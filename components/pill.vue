<template>
  <nuxt-link :to="props.to" v-if="props.to">
    <div class="pill">
      {{props.text}}
    </div>
  </nuxt-link>
  <div class="pill" v-else>
    <small>{{props.text}}</small>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    to: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  .pill{
    border: $border-width solid dark(100%);
    display:inline-block;
    padding:0px sizer(1);
    margin-right: sizer(0.5);
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
    }
  }
</style>