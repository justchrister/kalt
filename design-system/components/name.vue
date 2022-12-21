<template>
  <div class="name">
    <dds-textInput wrapperClass="first-name" inputId="first-name" placeholder="First name" label="First name:" :value="value[0]" />
    <dds-textInput wrapperClass="last-name"  inputId="last-name"  placeholder="Last name"  label="Last name:"  :value="value[1]" />
  </div>
</template>
<script>
  export default{ 
    props: ['value']
} // inputId = forInput in label and id in input
</script>