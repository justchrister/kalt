<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    width: {
      type: String,
      required: false
    }
  })

  const classes = computed(() => {
    let classes = ['frame']
    if (props.width) {
      classes.push(props.width)
    }
    return classes
  })
</script>
<style scoped lang="scss">
.frame {
  width: $sitewidth;
  max-width: $maxsitewidth;
  margin:0 auto sizer(3) auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-end;
  align-content: flex-start;
  height: 50vw;
  max-height: 418px;
  &.wide{
    max-width: $maxsitewidth*1.3;
  }
}
</style>