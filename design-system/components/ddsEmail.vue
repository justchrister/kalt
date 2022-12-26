<template>
  <div class="email">
    <div class="col-2 gutter-right">
    <dds-email-input
      uid="first-name"
      placeholder="First name"
      label="First name:"
      v-model="props.data.first_name"
    />
    </div>
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
