<template>
  <div class="wrap">
    <div class="icon">
    </div>
    <div class="content">
      <strong>  {{ props.title }}</strong>
      <p>
        <slot></slot>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  });
</script>
<style scoped lang="scss">
  .wrap{
    width:100%;
    min-height: sizer(10);
    border: $border;
    border-color: $dark-20;
    padding: sizer(1) sizer(1.5);
    background: $light;
    box-sizing:border-box;
    box-shadow: 0 0 sizer(2) 0 primaryColor(5%);
  }
  .content p{
    color: $dark-85;
    margin-top: sizer(0.5);
  }
  .content strong{
    color: $dark-90;
    font-size: sizer(1.5);
  }
  .wrap:hover{
    cursor:crosshair;
  }

</style>