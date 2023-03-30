<template>
  <footer>
    <block margin="none">
      <h4>Account:</h4>
      <div class="grid-col-3">
        <nuxt-link to="/portfolio" > Portfolio </nuxt-link>
        <nuxt-link to="/account" > Account </nuxt-link>
        <nuxt-link to="/notifications" > Notifications </nuxt-link>
        <nuxt-link to="/account/transactions" > Transactions </nuxt-link>
        <nuxt-link to="/cards" > Cards </nuxt-link>
        <nuxt-link to="/subscription" > Subscription </nuxt-link>
        <nuxt-link to="/auth/sign-up" > Sign up </nuxt-link>
        <nuxt-link to="/auth" > Sign in </nuxt-link>
        <nuxt-link to="/auth/sign-out" > Sign out 👋 </nuxt-link>
      </div>
    </block>
    <block margin="none">
      <h4>Content:</h4>
      <div class="grid-col-3">
        <nuxt-link to="/about" > About us </nuxt-link>
        <nuxt-link to="/about/values" > Our values </nuxt-link>
        <nuxt-link to="/about/mission" > Our mission </nuxt-link>
        <nuxt-link to="/questions" > Q&A </nuxt-link>
        <nuxt-link to="/questions/how-does-it-work" > How it works </nuxt-link>
        <nuxt-link to="/questions/how-do-you-make-money" > How we make money </nuxt-link>
      </div>
    </block>
    <div class="insignia">Make money, make a difference.</div>
  </footer>
</template>
<style scoped lang="scss">
footer{
  position:relative;
  background:$dark;
  padding:clamp($unit-min*4, $unit*4, $unit-max*4) 0 clamp($unit-min*2, $unit*2, $unit-max*2) 0;
  margin:clamp($unit-min*4, $unit*4, $unit-max*4) auto 0 auto;
  color:$light;
  a{
    color:$light;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
  h4{
    color:$light;
    margin-top:clamp($unit-min*2, $unit*2, $unit-max*2);
  }
  .insignia{
    background-image:url('/media/insignia/insignia-light.svg');
    background-size:contain;
    background-repeat:no-repeat;
    margin-top:clamp($unit-min*5, $unit*5, $unit-max*5);
    background-position: center center;
    width:100%;
    color:$light;
    font-family: $serif;
    font-size: $big-clamp;
    line-height: 150%;
    margin-bottom: $big-clamp-half;
    font-display: optional;
    font-size: 150%;
    height:clamp($unit-min*8, $unit*8, $unit-max*8);
    line-height:clamp($unit-min*8, $unit*8, $unit-max*8);
    text-align:center;
  }
}

</style>