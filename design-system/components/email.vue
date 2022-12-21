<template>
  <div class="email">
    <dds-emailInput wrapperClass="email" inputId="email" placeholder="E-mail:" label="E-mail:" :value="value" :supabaseTable="supabaseTable"/>
  </div>
</template>
<script>
  export default{ 
    props: ['value', 'supabaseTable']
} // inputId = forInput in label and id in input
</script>