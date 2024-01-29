<template>
  <div class="update" @click="navigateTo('/updates')" v-if="props.count>0">
    <span v-if="props.count>1">{{props.count}} new notifications </span> 
    <span v-else>new notification </span>
    <span class="arrow">↗</span>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    count: {
      type: Number,
      required: true
    }
  });
</script>
<style scoped lang="scss">
  .update{
    position:fixed;
    top:sizer(6);
    right:sizer(1.5);
    padding: sizer(.5) sizer(1.5);
    @include border;
    @include hoverable;
    
    background-color: blue(3%);
    font-size: sizer(1.2);
  }
  .update:hover{
    @include hovering;
  }
  .arrow{
    display:inline-block;
    transform: rotate(0deg);
    transition: transform 150ms $easing-in-out;
  }
  .update:hover .arrow{
    transform: rotate(45deg);
    transition: transform 150ms $easing-in-out;
    
  }
</style>