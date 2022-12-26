<template>
  <select @input="emit('update:modelValue', $event.target.value)"
    selected="{{selected}}">
    <option v-for="choice of choices" :value="choice.toLowerCase()" :key="choice">{{choice}}</option>
  </select>
</template>

<script lang="ts" setup>
const props = defineProps<{
  selected: string;
  modelValue: string;
  choices: [string];
}>();
let emit = defineEmits(['update:modelValue']);
</script>
