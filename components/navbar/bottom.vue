<template>
  <footer id="bottom-menu">
    <block margin="half">
      <div class="section">
        <p>Account</p>
        <ul>
          <nuxt-link to="/portfolio" > Portfolio </nuxt-link>
          <nuxt-link to="/profile" > Profile </nuxt-link>
          <nuxt-link to="/accounts" > Accounts </nuxt-link>
          <nuxt-link to="/subscription" > Subscription </nuxt-link>
          <nuxt-link to="/cards" > Cards </nuxt-link>
          <nuxt-link to="/accounts/transactions" > Transactions </nuxt-link>
          <nuxt-link to="/portfolio/buy" > Buy shares </nuxt-link>
        </ul>
      </div>
    </block>
    <block margin="half">
      <div class="section">
        <p>Content</p>
        <ul>
          <nuxt-link to="/about" > About us </nuxt-link>
          <nuxt-link to="/about/values" > Our values </nuxt-link>
          <nuxt-link to="/about/whitepaper" > Whitepaper </nuxt-link>
          <nuxt-link to="/jobs" > Jobs </nuxt-link>
          <nuxt-link to="/questions" > Q&A </nuxt-link>
          <nuxt-link to="/questions/how-does-it-work" > How it works </nuxt-link>
          <nuxt-link to="/questions/how-do-you-make-money" > How we make money </nuxt-link>
        </ul>
      </div>
    </block>
    <block margin="none">
      <div class="section">
        <p>Auth</p>
        <ul>
          <nuxt-link to="/request" > Request invite </nuxt-link>
          <nuxt-link to="/auth" > Sign in </nuxt-link>
          <nuxt-link to="/auth/sign-out" > Sign out 👋 </nuxt-link>
        </ul>
      </div>
    </block>
    <div class="insignia">Make money, make a difference.</div>
  </footer>
</template>
<style scoped lang="scss">
  footer{
    position:relative;
    background:$dark;
    padding:$clamp-4 0 $clamp-2 0;
    margin:$clamp-4 auto 0 auto;

    border-top: $light solid 1px;
    color:$light;
  }
  .section{
    display: grid; 
    grid-template-columns: 1fr 5fr; 
    gap: 2% 0px;
  }
  p{
    margin-top:0;
    color:$light;
  }
  ul{
    display: grid;
    gap: 2% 2%;
    grid-template-columns: 1fr 1fr 1fr;
  }
  a{
    color:$light;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
  .insignia{
    background-image:url('/media/insignia/insignia-light.svg');
    background-size:contain;
    background-repeat:no-repeat;
    margin-top:$clamp-5;
    background-position: center center;
    width:100%;
    color:$light;
    font-family: $serif;
    font-size: $clamp-3-5;
    line-height: 150%;
    margin-bottom: $clamp-2;
    font-display: optional;
    font-size: 150%;
    height:clamp($unit-min*8, $unit*8, $unit-max*8);
    line-height:clamp($unit-min*8, $unit*8, $unit-max*8);
    text-align:center;
  }
</style>