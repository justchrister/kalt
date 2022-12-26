<template>
  <div class="password">
    <dds-password-input
      uid="email"
      placeholder="LOOOOOOOOOOOOL!?"
      label="Password:"
      v-model="props.data.password"
    />
  </div>
</template>

<script lang="ts" setup>

// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    password: string;
  };
}>();
</script>