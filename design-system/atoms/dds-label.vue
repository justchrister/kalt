<template>
  <label :for="forInput">{{label}}</label>
</template>
<script>
  export default{ props: ['forInput', 'label']}
</script>