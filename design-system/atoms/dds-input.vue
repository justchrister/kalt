<template>
  <input :type="type" :placeholder="placeholder" :value="value" :id="id">
</template>
<script>
  export default{ props: ['type', 'placeholder', 'value', 'id']}
</script>