<template>
  <div class="cta">
    <div class="button-group" v-if="signedIn">
      <nuxt-link to="/portfolio/sell">
        <button id="sell" tabindex="-1">divest</button>
      </nuxt-link>
      <nuxt-link to="/invest">
        <button id="buy" tabindex="-1">invest</button>
      </nuxt-link>
    </div>
    <div class="button-group" v-if="!signedIn">
      <nuxt-link to="/auth/sign-up">
        <button id="sign-up" tabindex="-1">create account</button>
      </nuxt-link>
      <nuxt-link to="/auth">
        <button id="sign-in" tabindex="-1">sign in</button>
      </nuxt-link>
    </div>
    <div class="link-group">
      <nuxt-link to="/questions/how-does-it-work" v-if="!signedIn">How it works</nuxt-link>
      <nuxt-link to="/questions/how-does-it-work" v-if="!signedIn">About us</nuxt-link>
    </div>
  </div>
</template>

<script setup>
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
  let signedIn = false
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  if(userId.value) signedIn = true
</script>
<style scoped lang="scss">
.cta{
  text-align: center;
  margin:$clamp 0;
}
.button-group{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: $clamp;
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
</style>