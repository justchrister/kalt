<template>
  <div class="name">
    <dds-textInput inputId="first-name" placeholder="First name" label="First name:" :value="value[0]" />
    <dds-textInput inputId="last-name" placeholder="Last name" label="Last name:" :value="value[1]" />
  </div>
</template>
<script>
  export default{ props: ['value']} // inputId = forInput in label and id in input
</script>