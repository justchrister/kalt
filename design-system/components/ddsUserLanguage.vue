<template>
  <dds-language-select 
    label="Default language:"
    uid="select-language" 
    v-model="props.data.language"/>
</template>

<script lang="ts" setup>
// You can move this to general interface and reuse them if its same accross the app
const props = defineProps<{
  data: {
    language: string;
  };
}>();

</script>
