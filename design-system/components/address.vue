<template>
  <div class="address">
    <dds-textInput wrapperClass="country" inputId="country" placeholder="Country" label="Country:" :value="value[0]" />
    <dds-textInput wrapperClass="city"  inputId="city"  placeholder="City"  label="City:"  :value="value[1]" />
    <dds-numberInput wrapperClass="postalCode"  inputId="postalCode"  placeholder="Postal code:"  label="Postal code:"  :value="value[2]" />
    <dds-numberInput wrapperClass="addressLine1"  inputId="addressLine1"  placeholder="Address line 1:"  label="Address line 1:"  :value="value[3]" />
    <dds-numberInput wrapperClass="addressLine2"  inputId="addressLine2"  placeholder="Address line 2:"  label="Address line 2:"  :value="value[4]" />
  </div>
</template>
<script>
  export default{ 
    props: ['value']
} // inputId = forInput in label and id in input
</script>