<template>
  <div class="invite">
    <div class="code">{{ props.code }}</div>
    <div class="copyButton" @click="copy(props.code)">COPY</div>
    <div class="shareButton" @click="share(props.code)">SHARE</div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    code: {
      type: String,
      required: true
    }
  })
  const copy = (code: string) => {
    const text = 'https://ka.lt/invite/' + code;
    navigator.clipboard.writeText(text).then(() => {
      ok.log('', 'copied to clipboard')
    }).catch(err => {
      ok.log('error', 'error in copying to clipboard', err);
    });
  }
  const share = (code: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Kalt — The exclusive impact investing platform',
        text: 'Build a purpose-driven portfolio on the invite-only investing platform.',
        url: 'https://ka.lt/invite/' + code
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
    grid-template-columns: 1fr sizer(5.7) sizer(6.2);
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
    width: sizer(6.5);
    height: sizer(2);
    font-weight:600;
    line-height:sizer(2);
    font-size:sizer(.8);
    padding-left:sizer(2.5);
    box-sizing:border-box;
    color:dark(75%);
    background-size:sizer(.85);
    background-repeat:no-repeat;
    background-position:sizer(.85) center;
    transition: background-color 0.2s $easing-in-out;
    &:hover{
      transition: background-color 0.2s $easing-in-out;
      cursor: pointer;
    }
  }
  .copyButton{
    width: sizer(5.7);
    background-image: url('/icons/copy.svg');
    background-color: green(15%);
    &:hover{
      background-color: green(20%);
    }
  }
  .shareButton{
    width: sizer(6.2);
    background-image: url('/icons/share.svg');
    background-color: blue(15%);
    &:hover{
      background-color: blue(20%);
    }
  }
</style>