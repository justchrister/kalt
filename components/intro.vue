<template>
  <section :class="props.marginBottom">
    <block margin="none"><div class="label" v-if="props.label">{{props.label}}</div> 
      <h1>{{props.title}}  
</h1>
      <p v-if="props.paragraph">
        {{ props.paragraph  }}
      </p>
    </block>
  </section>
</template>
<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    paragraph:{
      type: String,
      required: false
    },
    label:{
      type: String,
      default: '',
      required: false
    },
    marginBottom:{
      type: String,
      default: '',
      required: false
    }
  })
</script>
<style scoped lang="scss">
section{
  padding: sizer(9) 0 sizer(7) 0;
  margin-bottom: sizer(5);
  background:url('/images/gradient-2.jpg') no-repeat center center;
  background-size:cover;

  &.none{
    margin-bottom: 0px;
  }
  h1{
    color: dark(90%);
  }
  p{
    line-height:150%;
  }
}
  .label{
    font-size:sizer(1.5);
    font-weight: bold;
    display:inline-block;
    width: auto;
    padding: sizer(1) sizer(2);
    line-height: 1; 
    background:blue(0%);
    color: blue(200%);
    @include border;
    border-radius: 100%;
    border-width: sizer(0.1);
    transform:scale(0.8) translateX(-10%) translateY(0%);
    border-color: dark(100%);
    margin: sizer(1) auto;
    text-align: center;
  }
</style>