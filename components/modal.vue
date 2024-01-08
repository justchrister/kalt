<template>
  <div class="wrap" v-if="show">
    <div class="background" @click="removeModal"></div>
    <div class="modal">
      <div class="title">
        <strong v-if="props.title">
          {{ props.title }}
        </strong>
        <div class="close"></div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
      required: false
    },
    title: {
      type: String, 
      required: false
    }
  })
  const show = ref(props.show);
  const removeModal = () => {
    show.value=false
  }
  const showModal = () => {
    show.value=true
  }

  watch(() => props.show, (newValue, oldValue) => {
    showModal()
    
  })
</script>
<style scoped lang="scss">
  .background{
    width:100%;
    height:100%;
    position:absolute;
    background:rgba($light, 0.2);
    &:hover{
      cursor: pointer;
    }
  }
  .wrap{
    top:0;
    left:0;
    width:100%;
    height:100%;
    position:fixed;
  }
  .modal {
    width: $sitewidth*.5;
    max-width: $maxsitewidth*.5;
    margin:auto;
    position:relative;
    top:calc(50vh - sizer(8));
    height:sizer(16);
    padding:sizer(1.6) sizer(2);
    background:$light;
    @include border;
    @include hoverable;
  }
  .title{
    width:100%;
    height:sizer(3.5);
  }
</style>