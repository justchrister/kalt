<template>
  <input
    :id="props.id"
    :type="props.type"
    :value="props.modelValue"
    :placeholder="placeholder"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  type: string;
  placeholder?: string;
  id?: string;
}>();

let emit = defineEmits(['update:modelValue']);
</script>
