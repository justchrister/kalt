<template>
  <div class="link-wrap">
    <nuxt-link :to="props.to">
      <div class="link">
        <slot></slot> ↗
      </div>
    </nuxt-link>
  </div>
</template>
<script setup>
  const props = defineProps({
    to: {
      type: String,
      required: true
    }
  })

</script>
<style scoped lang="scss">
  .link-wrap{
    display: flex;  // Changed to flex
    justify-content: flex-start;  // Pushes the child to the right
    position:relative;
    width: $clamp-40;
    min-height:$clamp-6;
    margin-right: $clamp-18;
  }
  .link{
    display:inline-block;
    background: $marine-10;
    border: $border;
    border-color: $marine-80;
    border-radius: $clamp-0-5;
    width: auto;
    max-width: $clamp-40;
    margin: $clamp-1 0;
    margin-right: auto;  // Pushes to the right
    padding: $clamp-1;
  }
  .link:hover{
    cursor: pointer;
    background:$marine-20;
    border-color:$marine;
    text-decoration:underline;
  }
</style>