<template>
  <div class="intro" :id="props.color">
    <block margin="none">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
      <p v-if="props.paragraph">{{props.paragraph}}</p>
    </block>
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
  &#green{ background:$green-20;}
  &#blue{ background:$blue-20;}
  &#pink{ background:$pink-20;}
}
</style>