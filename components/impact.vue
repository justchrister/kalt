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
  padding:$clamp 0;
  border-top:$border;
  display: grid;
  grid-template-columns: $clamp-4 1fr;
  grid-template-rows: 1fr;
  gap: 0;
  grid-auto-flow: row;
  font-size:120%;
}

.impacts .impact .image{
  height: $clamp-3;
  width: $clamp-3;
  border-radius:50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size:cover;
  background-image:url('/orbs/grain.png');
}
.impacts .impact .image#pink{
  background-color:$pink-40;
}
.impacts .impact .image#blue{
  background-color:$blue-40;
}
.impacts .impact .image#red{
  background-color:$red-40;
}
.impacts .impact .image#green{
  background-color:$green-40;
}
</style>