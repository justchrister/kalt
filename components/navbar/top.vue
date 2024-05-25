<template>
  <header>
    <nav class="menu">
      <ul>
        <li class="logomark" @click="logoClick()">
          <div class="logo"></div>
          <span> </span> {{route.meta.pagename}}
        </li>

        <span v-if="signedIn">
          <li>
            <nuxt-link to="/invest" @click="toggleMenu()"> Invest </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/portfolio" @click="toggleMenu()"> Portfolio </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/funds/your" @click="toggleMenu()"> Your fund </nuxt-link>
          </li>
          <li>
            <a href="/auth/sign-out" @click="toggleMenu()"> Sign out </a>
          </li>
        </span>
        <span  v-if="!signedIn">
        <li>
          <nuxt-link to="/vision" @click="toggleMenu()"> Vision </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/questions/how-does-it-work" @click="toggleMenu()"> How it works </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/funds" @click="toggleMenu()"> Funds </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/invite/request/amount" @click="toggleMenu()"> Sign up </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/auth" @click="toggleMenu()"> Sign in </nuxt-link>
        </li>
      </span>
      </ul>
    </nav>

    <button @click="toggleMenu()">menu</button>
  </header>
</template>

<script setup lang="ts">
  const route = useRoute()
  const signedIn = ref(false)
  const toggleMenu = async () => { 
    const auth = useSupabaseUser()
    document.getElementsByTagName("body")[0].classList.toggle("show-menu");
    if(auth.value) {
      signedIn.value = true
    } else {
      signedIn.value = false
    }
  }
  const props = defineProps({
    pageTitle: {
      type: String,
      required: false
    }
  })
  const logoClick = async () => {
    const auth = useSupabaseUser()
    if(auth.value) {
      navigateTo('/portfolio')
    } else {
      navigateTo('/')
    }
  }
</script>
<style scoped lang="scss">
  $logoSize: 1.6;
  $margins: 1.5;
  .logo{
    width: sizer($logoSize);
    height: sizer($logoSize);
    display:block;
    position:fixed;
    top: 0;
    left: 0;
    background: dark(100%);
    border-radius:100%;
    margin: sizer(1.69) sizer(1) sizer(2) sizer($margins);
    animation-name: example;
    animation-duration: 12s;
    animation-delay: 500ms;
    animation-iteration-count: 99999;
  }
  .logomark:hover{
    cursor:pointer;
    text-decoration: underline;
  }
  header{
    position:fixed;
    width:100%;
    z-index: 2000;
  }
  .logomark,
  .logomark span,
  button,
  ul li,
  ul li a{
    line-height:145%;
    font-size: $display-sub;
  }
  .logomark span{
    font-weight:bold;
    opacity:1;
  }
  ul li.logomark:before{
    display:none;
  }
  ul li:before{
    opacity:0;
    content:'  ';
    font-weight:bold;
    display:inline;
  }
  .menu ul{
    position: fixed;
    z-index: 3;
    margin: 0;
    height: sizer(4);
    overflow:hidden;
    padding: sizer(1) sizer(2) sizer(1) sizer(2.2+$margins);
    li.logomark{
      opacity:1;
      pointer-events : all;
    }
    li {
      opacity:0;
      pointer-events : none;
      padding: 0;
      margin-bottom:0;
      a{
        text-decoration: none;
        &:hover{
          text-decoration:underline;
        }
      }
    }
  }

  button {
    padding: sizer(1) sizer($margins);
    position: fixed;
    top: $border-width;
    width: auto;
    right:0;
    color: dark(100%);
    border: 0;
    &:hover,
    &:hover:before{
      text-decoration: underline;
    }
    &:before{
      content:"close ";
      white-space: pre;
      display:inline-block;
      opacity:0;
    }
  }


  @keyframes example {
    0% {
      transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
    }
    33% {
      transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(177deg) rotateY(180deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
    }
    100% {
      transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(177deg) rotateY(180deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
    }
  }
</style>
<style lang="scss">
.show-menu{
  .menu ul{
    overflow: visible;
  }
  .menu ul li{
    opacity:1;
    pointer-events : all;
  }
  header button:before{
    opacity:1;
  }
}
.show-menu footer,
.show-menu main{
  opacity:0;
  pointer-events : none;
}
</style>