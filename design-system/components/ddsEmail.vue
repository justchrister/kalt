<template>
  <div class="email">
    <dds-email-input
      uid="email"
      placeholder="E-mail"
      label="E-mail:"
      v-model="props.data.email"
    />
  </div>
</template>

<script lang="ts" setup>
// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    email: string;
  };
}>();
</script>
