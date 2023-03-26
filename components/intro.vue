<template>
  <div class="intro" :id="props.color">
    <div class="block">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
      <p>{{props.paragraph}}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    paragraph: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },

  })
</script>
<style scoped lang="scss">
.intro{
  padding:clamp($unit-min*7, $unit*7, $unit-max*7);
  margin-bottom:clamp($unit-min*5, $unit*5, $unit-max*5);
  h1{
    margin:0;
  }
  &#green{ background:$green;}
  &#blue{ background:$blue;}
  &#pink{ background:$pink;}
}
</style>