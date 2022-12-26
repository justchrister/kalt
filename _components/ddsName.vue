<template>
  <div class="name">
    <div class="col-2 gutter-right">
    <dds-text-input
      uid="first-name"
      placeholder="First name"
      label="First name:"
      v-model="props.data.first_name"
    />
    </div>
    <div class="col-2 gutter-left">
      <dds-text-input
        uid="last-name"
        placeholder="Last name"
        label="Last name:"
        v-model="props.data.last_name"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    first_name: string;
    last_name: string;
  };
}>();
</script>
