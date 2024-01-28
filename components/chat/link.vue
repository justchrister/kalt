<template>
  <div class="link-wrap">
    <nuxt-link :to="props.to">
      <div class="link">
        <slot></slot> ↗
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
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
    width: sizer(40);
    min-height: sizer(6);
    margin-right: sizer(18);
  }
  .link{
    display:inline-block;
    border-radius: sizer(0.5);
    width: auto;
    max-width: sizer(40);
    margin: sizer(1) 0;
    margin-right: auto;  // Pushes to the right
    padding: sizer(1);
    @include hoverable;
    @include border;
  }
  .link:hover{
    @include hovering;
    text-decoration:underline;
  }
</style>