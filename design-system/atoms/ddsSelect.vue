<template>
  <select @input="emit('update:modelValue', $event.target.value)">
    <option v-for="choice of choices" :value="choice" :key="choice">{{choice}}</option>
  </select>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  choices: [string];
}>();

let emit = defineEmits(['update:modelValue']);
</script>
