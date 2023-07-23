<template>
  <span :class="emoji">{{emoji}}</span>
</template>
<script setup>
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
  color:$dark;
  pointer-events:all;
}

/* happy */
span.happy,
span.😊 ,
span.🙂 { 
  background-image:url('../omoji/happy.svg');
}
/* Super happy */
span.😃,
span.😄,
span.😁,
span.😆,
span.😀 { 
  background-image:url('../omoji/super-happy.svg');
}
/* Sad */
span.☹️,
span.🙁,
span.😟,
span.😒,
span.😞,
span.😔 { background-image:url('../omoji/sad.svg');}

/* ambivalent */
span.🙃 {
  background-image:url('../omoji/ambivalent.svg');
}

/* Suprised */
span.😯,
span.😮,
span.😲 {
  background-image:url('../omoji/suprised.svg');
}

/* Scared or very sad*/
span.😦 {
  background-image:url('../omoji/scared.svg');
}
/* wink */
span.😉 {
  background-image:url('../omoji/wink.svg');
}
/* laughing */
/* tounge-out */
span.😜,
span.😛,
span.😝,
span.🤪 {
  background-image:url('../omoji/tounge-out.svg');
}
/* other */
span.☀️{ 
  background-image:url('../omoji/sun.svg');
}
span.✨ {
  background-image:url('../omoji/stars.svg');
}
/* arrows */

span.↑{
  background-image:url('../omoji/arrow-up.svg');
}
span.↗{
  background-image:url('../omoji/arrow-up-right.svg');
}
span.→{
  background-image:url('../omoji/arrow-right.svg');
}
span.↘{
  background-image:url('../omoji/arrow-down-right.svg');
}
span.↓{
  background-image:url('../omoji/arrow-down.svg');
}
span.↙{
  background-image:url('../omoji/arrow-down-left.svg');
}
span.←{
  background-image:url('../omoji/arrow-left.svg');
}
span.↖{
  background-image:url('../omoji/arrow-up-left.svg');
}
span.↻{
  font-size: 138%;
  background-image:url('../omoji/arrow-clockwise.svg');
}
span.↺{
  font-size: 138%;
  background-image:url('../omoji/arrow-anti-clockwise.svg');
}

// Enclosed Alphanumerics - compart.com/en/unicode/block/U+2460
span.ⓘ{
  font-size: 138%;
  background-image:url('../omoji/enclosed-text-i.svg');
}


/* happy */
span.happy,
span.😊 ,
span.🙂 { 
  background-image:url('../omoji/happy.svg');
}
/* Super happy */
span.😃,
span.😄,
span.😁,
span.😆,
span.😀 { 
  background-image:url('../omoji/super-happy.svg');
}
/* Sad */
span.☹️,
span.🙁,
span.😟,
span.😒,
span.😞,
span.😔 { background-image:url('../omoji/sad.svg');}

/* ambivalent */
span.🙃 {
  background-image:url('../omoji/ambivalent.svg');
}

/* Suprised */
span.😯,
span.😮,
span.😲 {
  background-image:url('../omoji/suprised.svg');
}

//                               //
//           DARK MODE           //
//                               //

/*.dark-mode{
  span.happy,
  span.😊 ,
  span.🙂 { 
    background-image:url('../omoji/light/happy.svg');
  }
  span.😃,
  span.😄,
  span.😁,
  span.😆,
  span.😀 { 
    background-image:url('../omoji/light/super-happy.svg');
  }
  span.☹️,
  span.🙁,
  span.😟,
  span.😒,
  span.😞,
  span.😔 { background-image:url('../omoji/light/sad.svg');}

  span.🙃 {
    background-image:url('../omoji/light/ambivalent.svg');
  }

  span.😯,
  span.😮,
  span.😲 {
    background-image:url('../omoji/light/suprised.svg');
  }

  span.😦 {
    background-image:url('../omoji/light/scared.svg');
  }
  span.😉 {
    background-image:url('../omoji/light/wink.svg');
  }
  span.😜,
  span.😛,
  span.😝,
  span.🤪 {
    background-image:url('../omoji/light/tounge-out.svg');
  }
  span.☀️{ 
    background-image:url('../omoji/light/sun.svg');
  }
  span.✨ {
    background-image:url('../omoji/light/stars.svg');
  }
  span.↑{
    background-image:url('../omoji/light/arrow-up.svg');
  }
  span.↗{
    background-image:url('../omoji/light/arrow-up-right.svg');
  }
  span.→{
    background-image:url('../omoji/light/arrow-right.svg');
  }
  span.↘{
    background-image:url('../omoji/light/arrow-down-right.svg');
  }
  span.↓{
    background-image:url('../omoji/light/arrow-down.svg');
  }
  span.↙{
    background-image:url('../omoji/light/arrow-down-left.svg');
  }
  span.←{
    background-image:url('../omoji/light/arrow-left.svg');
  }
  span.↖{
    background-image:url('../omoji/light/arrow-up-left.svg');
  }
  span.↻{
    font-size: 138%;
    background-image:url('../omoji/light/arrow-clockwise.svg');
  }
  span.↺{
    font-size: 138%;
    background-image:url('../omoji/light/arrow-anti-clockwise.svg');
  }

  span.ⓘ{
    font-size: 138%;
    background-image:url('../omoji/light/enclosed-text-i.svg');
  }
  span.happy,
  span.😊 ,
  span.🙂 { 
    background-image:url('../omoji/light/happy.svg');
  }
  span.😃,
  span.😄,
  span.😁,
  span.😆,
  span.😀 { 
    background-image:url('../omoji/light/super-happy.svg');
  }
  span.☹️,
  span.🙁,
  span.😟,
  span.😒,
  span.😞,
  span.😔 { background-image:url('../omoji/light/sad.svg');}

  span.🙃 {
    background-image:url('../omoji/light/ambivalent.svg');
  }

  span.😯,
  span.😮,
  span.😲 {
    background-image:url('../omoji/light/suprised.svg');
  }
}*/
</style>

