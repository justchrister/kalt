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
  },
  emoji: {
    type: String,
    required: false
  }
})
</script>