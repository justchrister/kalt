<template>
  <input :type="type" :placeholder="placeholder" :value="value" :id="id" @keyup="callEvent">
</template>
<script>
  export default{ 
    props: ['type', 'placeholder', 'value', 'id'],
    emits: ['value'],
    methods:{
      callEvent(){
        if (supabaseTable){
          console.log(this.value)
        }
      }
    }
  }
// https://stackoverflow.com/questions/66269080/detect-change-to-modelvalue-in-vue-3
</script>
