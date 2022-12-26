<template>
  <dds-currency-select 
    label="Default currency:"
    uid="select-currency" 
    :selected="props.data.currency"
    v-model="props.data.currency"/>
</template>

<script lang="ts" setup>
// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    currency: string;
  };
}>();

</script>
