<template>
  <div :class="'dds-passwordInput '+uid" >
    <dds-label :label="props.label" :for="uid" />
    <dds-input
      type="password"
      :id="props.uid"
      :placeholder="props.placeholder"
      v-model="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  modelValue: string;
  uid: string;
  placeholder: string;
  label: string;
}>();

let emit = defineEmits(['update:modelValue']);
</script>