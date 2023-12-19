<template>
  <main>
    <intro title="Questions and answers"
    paragraph="Here we try to answer some questions you might have, in simple to understand."/>
    <block>
      <chat-link to="/questions/how-does-it-work?">
        How does it work?
      </chat-link>
      <chat-link to="/questions/ddf?">
        What is a direct dividend fund?
      </chat-link>
      <chat-link to="/questions/how-do-you-make-money">
        How does Kalt make money?
      </chat-link>
      <chat-link to="/questions/what-is-residual-income?">
        What is residual income?
      </chat-link>
      <chat-link to="/questions/compound-interest?">
        How does compound interest work?
      </chat-link>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Questions'
  })
  useHead({
    title: 'Questions'
  })
</script>
<style scoped lang="scss">
  main{padding-top:0;}
  main a{
    display:block;
    text-decoration:none;
    font-size:150%;
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom:sizer(2);
    padding-bottom:sizer(1);
    border-bottom:1px solid black;
  }
  /*
  .dark-mode main a{
    border-color:$light;
  }
  */
</style>