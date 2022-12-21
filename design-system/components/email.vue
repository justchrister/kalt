<template>
  <div class="email">
    <dds-emailInput wrapperClass="email" inputId="email" placeholder="E-mail:" label="E-mail:" :value="value" />
  </div>
</template>
<script>
  export default{ 
    props: ['value']
} // inputId = forInput in label and id in input
</script>