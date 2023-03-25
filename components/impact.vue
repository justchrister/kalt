<template>
  <div class="impact">
    <div class="image" :id="props.type"></div>
    <p class="title">{{props.title}}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">
.impacts{
  margin-top:$big-clamp;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2% 2%;
  grid-auto-flow: row;
}
.impacts .impact{
  padding:clamp($unit-min, $unit, $unit-max) 0;
  border-top:$border;
  display: grid;
  grid-template-columns: 1fr 9fr;
  grid-template-rows: 1fr;
  gap: 3% 2%;
  grid-auto-flow: row;
  font-size:120%;
}

.impacts .impact .image{
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size:contain;
}
.impacts .impact .image#car{
  background-image:url('/media/illustrations/car.svg');
}
.impacts .impact .image#house{
  background-image:url('/media/illustrations/house.svg');
}
.impacts .impact .image#plane{
  background-image:url('/media/illustrations/plane.svg');
}
.impacts .impact .image#plant{
  background-image:url('/media/illustrations/plant.svg');
}
</style>