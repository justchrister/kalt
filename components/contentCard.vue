<template>
  <div class="content-card" :id="props.color" >
    <div class="title">
      <span class="number">{{addZero(props.number)}}.</span> 
      {{props.title}}
    </div>
    <div class="content" v-if="props.content">{{props.content}}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  number: {
    type: Number,
    required: false
  }
})

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
</script>
<style scoped lang="scss">
  .content-card{
    border:$border;
    padding:$clamp;
    margin:$clamp auto;
    max-width:calc($maxsitewidth/1.5);
    width:calc($sitewidth/1.5);
    border-radius:$clamp;
  }
  .number{
    font-family:$monospace;
  }
  .content{
    font-size:75%;
  }
  #green{
    border-color:$green;
    background:$green-20;
  }
  #blue{
    border-color:$blue;
    background:$blue-20;
  }
  #pink{
    border-color:$pink;
    background:$pink-20;
  }
</style>