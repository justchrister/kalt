<template>
  <div class="invite">
    <div class="code">{{ props.code }}</div>
    <div class="copyButton"></div>
    <div class="shareButton" @click="share()"></div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    code: {
      type: String,
      required: true
    }
  })
  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kalt — Invite',
        text: 'Build a purpose-driven portfolio at Kalt investment options on Kalt.',
        url: 'https://kalt.com/invite/' + props.code
      }).then(() => {
        // stuff
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      // idk wtf to do here? Open a modal?
    }
  }
</script>
<style scoped lang="scss">
  .invite{
    @include border;
    @include hoverable;
    display: grid;
    padding:sizer(.5);
    max-height: sizer(5);
    font-family: $monospace;
    gap: sizer(.5);
    grid-template-columns: 1fr sizer(2) sizer(2);
    box-sizing:border-box;
    &:hover{
      @include hovering;
      cursor:auto;
      .code{
        color:dark(90%);
      }
    }
  }
  .code{
    font-family: $monospace;
    font-size:sizer(1);
    padding-left:sizer(0.5);
    color:dark(70%);
  }
  .copyButton,
  .shareButton{
    @include border;
    width: sizer(2);
    height: sizer(2);
    background-size:50%;
    background-repeat:no-repeat;
    background-position:center;
    transition: background-color 0.2s $easing-in-out;
    &:hover{
      transition: background-color 0.2s $easing-in-out;
      cursor: pointer;
    }
  }
  .copyButton{
    background-image: url('/icons/copy.svg');
    background-color: green(15%);
    &:hover{
      background-color: green(20%);
    }
  }
  .shareButton{
    background-image: url('/icons/share.svg');
    background-color: blue(15%);
    &:hover{
      background-color: blue(20%);
    }
  }
</style>