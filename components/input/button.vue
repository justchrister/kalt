<template>
  <div class="input-wrap" @click="navigateToLink()">
    <button>
      <slot></slot>
    </button>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    link: {
      type: String,
      required: false
    }
  })
  const navigateToLink = async () => {
    if(!props.link) return;
    navigateTo(props.link)
  }
</script>
<style scoped lang="scss">
  .input-wrap{
    margin-bottom: sizer(1);
    width: 100%;
    box-sizing:border-box;
    transition: border-color 0.2s $easing-in-out;
    @include border;
    @include hoverable;

    button{
      width: 100%;
      padding: sizer(1) sizer(2);
      color: dark(90%);
      @include font-body;
      @include border;
      border-color:transparent;
      transition: border-color 0.2s $easing-in-out;
      border-radius:100%;
    }

    &:hover {
      @include hovering;
      border-color:transparent; 
      transition: border-color 0.2s $easing-in-out;
      background-color:transparent;
      button{
        color:dark(100%);
        @include hovering;
        cursor: pointer;
      }
    }
  }
</style>