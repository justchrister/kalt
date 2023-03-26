<template>
  <div class="infobox" :id="type"> <omoji emoji="ⓘ" /> {{text}}</div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">
.infobox{
    border:$border-width solid $blue;
    border-radius:$border-radius;
    padding:clamp(calc($unit-min/2), calc($unit/2), calc($unit-max/2))
            clamp($unit-min, $unit, $unit-max);
    background:$blue-20;
    font-family: $sans-serif;
    font-size: clamp($unit-min*1.2, $unit*1.2, $unit-max*1.2);
    font-weight:normal;
    line-height: 150%;
    font-display: optional;
    margin: clamp($unit-min, $unit, $unit-max) 0 ;
    span{
        margin-right: clamp(calc($unit-min/2), calc($unit/2), calc($unit-max/2));
        font-size:90%;
    }
}
.infobox#warn{
    border:$border-width solid $yellow;
    background:$yellow-20;
}
</style>
