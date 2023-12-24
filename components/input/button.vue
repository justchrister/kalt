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
    @include border;
    @include hoverable;

    button{
      width: 100%;
      padding: sizer(1) sizer(2);
      @include border;
      border-color:transparent;
      @include font-body;
    }

    &:hover {
      button{
        @include hovering;
        border-radius:100%;
        cursor: pointer;
      }
    }
  }
</style>