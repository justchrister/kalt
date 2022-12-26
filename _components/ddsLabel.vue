<template>
  <label :for="props?.for" v-text="props?.label" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  for?: string;
}>();
</script>
