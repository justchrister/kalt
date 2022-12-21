<template>
  <div :class="'dds-textInput '+wrapperClass">
    <dds-label :forInput="inputId" :label="label" />
    <dds-input type="text" :tabindex="tabindex" :placeholder="placeholder" :value="value" :id="inputId" :supabaseTable="supabaseTable"/>
  </div>
</template>
<script>
  export default{ 
    props: ['tabindex', 'inputId', 'placeholder', 'value', 'label', 'wrapperClass', 'supabaseTable'] // inputId = forInput in label and id in input
  }
</script>

