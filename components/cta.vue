<template>
  <div class="cta">
    <div class="button-group" v-if="signedIn">
      <nuxt-link to="/subscription">
        <button  :class="animatedClass" id="subscription" tabindex="-1">manage subscription</button>
      </nuxt-link>
      <nuxt-link to="/portfolio/buy">
        <button  :class="animatedClass" id="one-time" tabindex="-1">one-time investment</button>
      </nuxt-link>
    </div>
    <nuxt-link v-if="props.showDivest" to="/portfolio/sell">or divest</nuxt-link>
    <div class="button-group" v-if="!signedIn">
      <nuxt-link to="/auth/sign-up">
        <button  :class="animatedClass" id="sign-up" tabindex="-1">create account</button>
      </nuxt-link>
      <nuxt-link to="/auth">
        <button  :class="animatedClass" id="sign-in" tabindex="-1">sign in</button>
      </nuxt-link>
    </div>
    <div class="link-group">
      <nuxt-link to="/questions/how-does-it-work" v-if="!signedIn">How it works</nuxt-link>
      <nuxt-link to="/questions/how-does-it-work" v-if="!signedIn">About us</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    showDivest: {
      default: false,
      type: Boolean,
      required: false
    },
    animated: {
      default: true,
      type: Boolean,
      required: false
    }
  })
  let animatedClass
  if(props.animated){
    animatedClass = "green-gradient"
  }
  let signedIn = false
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  if(user.value) signedIn = true
</script>
<style scoped lang="scss">
.cta{
  text-align: center;
}
.button-group{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: $clamp;
}
.green-gradient{
  background: linear-gradient(318deg, $light, $light  , $blue-20, $light, $light);
  background-size: 1200% 1200%;
  -webkit-animation: gradient 9s ease infinite;
  -moz-animation: gradient 9s ease infinite;
  animation: gradient 9s ease infinite;
}
#subscription{
  animation-delay: 1s;
}
a{
  text-decoration: none;
}
.link-group{
  margin-top:$clamp;
  text-align:left;
}
.link-group a {
  margin-right:$clamp-1-5;
  text-decoration:underline;
}
@-webkit-keyframes gradient {
  0%{background-position:0% 10%}
  50%{background-position:100% 91%}
  100%{background-position:0% 10%}
}
@-moz-keyframes gradient {
  0%{background-position:0% 10%}
  50%{background-position:100% 91%}
  100%{background-position:0% 10%}
}
@keyframes gradient {
  0%{background-position:0% 10%}
  50%{background-position:100% 91%}
  100%{background-position:0% 10%}
}
</style>