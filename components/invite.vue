<template>
  <div class="invite">
    <div class="code">{{ props.code }}</div>
    <div :class="'button '+state" @click="share(props.code)">
      <span v-if="!state">SEND</span>
      <span v-if="state==='copied'">COPIED</span>
      <span v-if="state==='loading'"><loading-icon/></span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    code: {
      type: String,
      required: true
    }
  })
  const state = ref('');

  const copy = async (code: string) => {
    const text = 'https://ka.lt/invite/' + code;
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
    });
  }
  const share = async (code: string) => {
    state.value = 'loading';
    await ok.sleep(200)
    if (navigator.share) {
      navigator.share({
        title: 'Kalt — The exclusive impact investing platform',
        text: 'Build a purpose-driven portfolio on the invite-only investing platform.',
        url: 'https://ka.lt/invite/' + code
      }).then(() => {
        state.value = '';
      })
      .catch(console.error);
    } else {
      await copy(code)
      await ok.sleep(300)
      state.value = 'copied';
    }
  }
</script>
<style scoped lang="scss">
  .invite{
    @include border;
    @include hoverable;
    display: grid;
    padding:sizer(1);
    max-height: sizer(6.5);
    font-family: $monospace;
    gap: sizer(1);
    grid-template-columns: 1fr sizer(6.5);
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
    font-size:sizer(1.2);
    padding-left:sizer(1) sizer(1);
    color:dark(70%);
  }
  .button{
    @include border;
    height: sizer(2);
    width: sizer(6.5);
    font-weight:600;
    line-height:sizer(2);
    font-size:sizer(.8);
    padding-left:sizer(2.5);
    box-sizing:border-box;
    color:dark(75%);
    background-size:sizer(.85);
    background-repeat:no-repeat;
    background-position:sizer(.85) center;
    transition:width .2s, padding-left .2s;
    background-image: url('/icons/share.svg');
    &:hover{
      cursor: pointer;
      @include selected;
    }
  }
  .button.copied{
    transition:width .2s, padding-left .2s;
    width:sizer(6.5);
    background-image: url('/icons/copy.svg');
    background-color: green(20%);
  }
  .button.loading{
    transition:width .2s, padding-left .2s;
    padding-left:sizer(.4);
    width:sizer(2);
    background-image:none;
  }
</style>