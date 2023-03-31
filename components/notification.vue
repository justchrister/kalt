<template>
  <div class="notification">
    <div class="profile-picture christer"></div>
    <div class="summary">
      <div class="by-line">{{props.from}}</div>
      <span class="date">{{props.date}}</span>
      <div class="title">{{props.title}} <omoji :emoji="props.emoji"/></div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  from: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">

.notification{
  padding:clamp($unit-min, $unit, $unit-max);
  padding-right:none;
  border:$border-width solid $dark;
  border-radius:$border-radius;
  margin:clamp($unit-min, $unit, $unit-max) 0;
  height:$clamp-4;
  &:hover{
    background:white;
    cursor: pointer;
  }
  &:hover .title{
    text-decoration:underline;
  }
  .profile-picture{
    width:$clamp-4;
    height:$clamp-4;
    display:inline-block;
    background-size:contain;
    border-radius:100%;
  }
  .profile-picture.christer{
    background-image: url('../media/people/caleb.jpg');
  }
  .summary{
    width:85%;
    margin-left:clamp($unit-min, $unit, $unit-max);
    display:inline-block;
    position:relative;
    height:$clamp-4;
    overflow:hidden;
  }

  .date,
  .summary .by-line{
    vertical-align:top;
    font-family: $monospace;
    text-transform: uppercase;
    line-height: 1.5;
    font-size:60%;

  }
  .date{
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>