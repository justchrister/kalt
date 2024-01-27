<template>
  <footer id="bottom-menu">
    <block margin="3">
      <h3>
        more...
      </h3>
    </block>
    <block margin="2">
      <div class="section">
        <p>You</p>
        <ul>
          <nuxt-link to="/portfolio" > Portfolio </nuxt-link>
          <nuxt-link to="/funds/your" > Your fund </nuxt-link>
          <nuxt-link to="/invest/" > Invest </nuxt-link>
          <nuxt-link to="/profile" > Profile </nuxt-link>
          <nuxt-link to="/accounts" > Accounts </nuxt-link>
        </ul>
      </div>
    </block>
    <block margin="2">
      <div class="section">
        <p>Auth</p>
        <ul>
          <nuxt-link to="/invite/request/amount" > Sign up </nuxt-link>
          <nuxt-link to="/auth" > Sign in </nuxt-link>
          <nuxt-link to="/auth/sign-out" > Sign out </nuxt-link>
        </ul>
      </div>
    </block>
    <block margin="2">
      <div class="section">
        <p>Us</p>
        <ul>
          <nuxt-link to="/vision" > Vision </nuxt-link>
          <nuxt-link to="/funds" > Funds </nuxt-link>
          <nuxt-link to="/jobs" > Jobs </nuxt-link>
          <a href="mailto:sup@ka.lt"> Contact us </a>
        </ul>
      </div>
    </block>
    <block margin="2">
      <div class="section">
        <p>Content</p>
        <ul>
          <nuxt-link to="/questions" > Questions and answers </nuxt-link>
          <nuxt-link to="/questions/how-does-it-work" > How it works </nuxt-link>
          <nuxt-link to="/questions/how-do-you-make-money" > How we make money </nuxt-link>
        </ul>
      </div>
    </block>
    <block margin="2">
      <div class="section">
        <p>Legal</p>
        <ul>
          <nuxt-link to="/about/tos" > TOS </nuxt-link>
          <nuxt-link to="/about/gdpr" > GDPR </nuxt-link>
        </ul>
      </div>
    </block>
    <div class="insignia">Make money, make a difference.</div>
  </footer>
</template>
<style scoped lang="scss">
  footer{
    position:relative;
    background: $dark;
    padding: sizer(4) 0 sizer(2) 0;
    margin: sizer(4) auto 0 auto;

    border-top: $light solid 1px;
    color: $light;
  }
  .section{
    display: grid; 
    grid-template-columns: 1fr 5fr; 
    gap: sizer(1);
    padding-top: sizer(1);
    border-top: $border;
    border-color: $dark-80;
    border-style: dashed;
  }
  p{
    margin-top:0;
    color: $light;
  }
  ul{
    display: grid;
    gap: sizer(0.5) sizer(1);
    grid-template-columns: 1fr 1fr 1fr;
  }
  a{
    color: $light;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }
  .insignia{
    background-image:url('/media/insignia/insignia-light.svg');
    background-size:contain;
    background-repeat:no-repeat;
    margin-top: sizer(5);
    background-position: center center;
    width:100%;
    color: $light;
    font-family: $serif;
    font-size: sizer(3.5);
    line-height: 150%;
    margin-bottom: sizer(2);
    font-display: optional;
    font-size: 150%;
    height: sizer(8);
    line-height: sizer(8);
    text-align:center;
  }
  h3{
    color: $light;
  }
</style>