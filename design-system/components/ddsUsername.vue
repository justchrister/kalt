<template>
  <div class="name">
    <div>
      <dds-text-input
        uid="username"
        placeholder="@username"
        label="Username:"
        v-model="props.data.username"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    username: string;
  };
}>();
</script>
