<template>
  <span :class="emoji">{{emoji}}</span>
</template>
<script setup lang="ts">
const props = defineProps({
  emoji: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">
span { 
  background-size:contain;
  color:transparent;
  background-repeat:no-repeat;
  pointer-events:none;
  background-position:center;
}
span:selected{
  color: dark(100%);
  pointer-events:all;
}

/* happy */
span.happy,
span.😊 ,
span.🙂 { 
  background-image:url('/omoji/happy.svg');
}
/* Super happy */
span.😃,
span.😄,
span.😁,
span.😆,
span.😀 { 
  background-image:url('/omoji/super-happy.svg');
}
/* Sad */
span.☹️,
span.🙁,
span.😟,
span.😒,
span.😞,
span.😔 { background-image:url('/omoji/sad.svg');}

/* ambivalent */
span.🙃 {
  background-image:url('/omoji/ambivalent.svg');
}

/* Suprised */
span.😯,
span.😮,
span.😲 {
  background-image:url('/omoji/suprised.svg');
}

/* Scared or very sad*/
span.😦 {
  background-image:url('/omoji/scared.svg');
}
/* wink */
span.😉 {
  background-image:url('/omoji/wink.svg');
}
/* laughing */
/* tounge-out */
span.😜,
span.😛,
span.😝,
span.🤪 {
  background-image:url('/omoji/tounge-out.svg');
}
/* other */
span.☀️{ 
  background-image:url('/omoji/sun.svg');
}
span.✨ {
  background-image:url('/omoji/stars.svg');
}
/* arrows */

span.↑{
  background-image:url('/omoji/arrow-up.svg');
}
span.↗{
  background-image:url('/omoji/arrow-up-right.svg');
}
span.→{
  background-image:url('/omoji/arrow-right.svg');
}
span.↘{
  background-image:url('/omoji/arrow-down-right.svg');
}
span.↓{
  background-image:url('/omoji/arrow-down.svg');
}
span.↙{
  background-image:url('/omoji/arrow-down-left.svg');
}
span.←{
  background-image:url('/omoji/arrow-left.svg');
}
span.↖{
  background-image:url('/omoji/arrow-up-left.svg');
}
span.↻{
  font-size: 138%;
  background-image:url('/omoji/arrow-clockwise.svg');
}
span.↺{
  font-size: 138%;
  background-image:url('/omoji/arrow-anti-clockwise.svg');
}

// Enclosed Alphanumerics - compart.com/en/unicode/block/U+2460
span.ⓘ{
  font-size: 138%;
  background-image:url('/omoji/enclosed-text-i.svg');
}


/* happy */
span.happy,
span.😊 ,
span.🙂 { 
  background-image:url('/omoji/happy.svg');
}
/* Super happy */
span.😃,
span.😄,
span.😁,
span.😆,
span.😀 { 
  background-image:url('/omoji/super-happy.svg');
}
/* Sad */
span.☹️,
span.🙁,
span.😟,
span.😒,
span.😞,
span.😔 { background-image:url('/omoji/sad.svg');}

/* ambivalent */
span.🙃 {
  background-image:url('/omoji/ambivalent.svg');
}

/* Suprised */
span.😯,
span.😮,
span.😲 {
  background-image:url('/omoji/suprised.svg');
}

/* Lightning */

span.⚡ {
  background-image:url('/omoji/lightning.svg');
}

/* frame */
span.🖼️ {
  background-image:url('/omoji/frame-w-flower.svg');
}

span.✔️ {
  background-image:url('/omoji/check-no-bg.svg');
}

span.✅{
  background-image:url('/omoji/check.svg');
}
span.•{
  background-image:url('/omoji/check.svg');

}
</style>

