<template>
  <div class="dds-emailInput {{wrapperClass}}">
    <dds-label :forInput="inputId" :label="label" />
    <dds-input type="text" :tabindex="tabindex" :placeholder="placeholder" :value="value" :id="inputId" />
  </div>
</template>
<script>
  export default{ 
    props: ['tabindex', 'inputId', 'placeholder', 'value', 'label', 'wrapperClass'] // inputId = forInput in label and id in input
  }
</script>