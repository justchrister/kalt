<template>
  <div class="cta">
    <div class="button-group" v-if="signedIn">
      <nuxt-link to="/sell">
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
  margin:sizer(1) 0;
}
.button-group{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: sizer(1);
}
a{
  text-decoration: none;
}
.link-group{
  margin-top:sizer(1);
  text-align:left;
}
.link-group a {
  margin-right:sizer(1.5);
  text-decoration:underline;
}
</style>