<template>
  <div class="username">
    <dds-textInput wrapperClass="username" inputId="username" placeholder="Username:" label="Username:" :value="value" />
  </div>
</template>
<script>
  export default{ 
    props: ['value']
} // inputId = forInput in label and id in input
</script>