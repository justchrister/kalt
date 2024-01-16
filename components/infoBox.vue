<template>
  <div class="infobox" :id="type"> <omoji emoji="ⓘ" /> {{text}}</div>
</template>
<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">
  .infobox{
      border: $border-width solid $blue;
      border-radius: $border-radius;
      padding:sizer(0.5) sizer(1);
      background: $blue-20;
      font-family: $sans-serif;
      font-size: sizer(1.2);
      font-weight:normal;
      line-height: 150%;
      font-display: optional;
      margin: sizer(1) 0 ;
      span{
          margin-right: sizer(0.5);
          font-size:90%;
      }
  }
  .infobox#warn{
      border: $border-width solid $yellow;
      background: $yellow-20;
  }
  .infobox#success{
      border: $border-width solid $green;
      background: $green-20;
  }
</style>
