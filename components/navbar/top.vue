<template>
  <header>
    <nav class="menu">
      <ul>
        <li class="logomark" @click="logoClick()">
          <div class="logo"></div>
          <span class="logotext"> Kalt </span><span class="emdash"> — </span><span class="pagename">{{route.meta.pagename}}</span>
        </li>

        <span v-if="signedIn" class="menuItems">
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
        <span  v-if="!signedIn" class="menuItems">
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

    <button @click="toggleMenu()"><span>menu</span></button>
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
    width: sizer($logoSize, 20.7px);
    height: sizer($logoSize, 20.7px);
    display:block;
    position:fixed;
    top: 0;
    left: 0;
    background: dark(100%);
    border-radius:100%;
    margin: sizer(1.69, 21.864375px) sizer(1, 12.9375px) sizer(2, 25.875px) sizer($margins, 19.40625px);
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
  .logomark{
    color:dark(100%);
    max-width:40vw; // control for mobile
  }
  .logomark,
  .logomark span,
  button,
  ul li,
  ul li a{
    line-height:145%;
    font-size: sizer($display-sub-sizer, 26.1984375px);
  }
  .logomark span.logotext,
  .logomark span.emdash{
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
  ul li:before{
    opacity:0;
    content:'Kalt — ';
    font-weight:bold;
    display:inline;
  }
  .menu ul{
    position: fixed;
    width:auto;
    z-index: 3;
    top: 0;
    margin: 0;
    height: sizer(4);
    overflow:hidden;
    padding: sizer(1, 12.9375px) sizer(2, 25.83px) sizer(1, 12.9375px) sizer(2.2+$margins, 47.86875px);
    li.logomark{
      opacity:1;
      pointer-events : all;
    }
    span.menuItems{
      display:none;
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
    z-index:9999;
    padding: sizer(1, 12.9375px) sizer($margins, 19.40625px);
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

  @keyframes moveDown {
    0% {
      transform: translateY(-10px);
      opacity: 0.5;
    }
    75%{
      opacity: 1;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  .menuItems li {
    animation: moveDown 0.35s forwards;
  }

  // Use SCSS loop to apply animation delay
  @for $i from 1 through 6 {
    .menuItems li:nth-child(#{$i}) {
      animation-delay: 0.02s * $i;
    }
  }
</style>
<style lang="scss">
.show-menu{
  .menu ul{
    overflow: visible;
  }
  .menu ul span.menuItems{
    display:block;
  }
  .menu ul li{
    opacity:0;
    pointer-events : all;
  }
  .menu ul li span.logotext {
    display:inline;
  }
  .menu ul li span.pagetext {
    display:none;
  }
  header button:before{
    content:"close ";
    white-space: pre;
    display:inline-block;
  }
}
.show-menu footer,
.show-menu main{
  opacity:0;
  pointer-events : none;
}
@media screen and (max-width: 630px) {

  .menu ul li.logomark span.emdash,
  .menu ul li.logomark span.pagename,
  .show-menu .menu ul li.logomark span.emdash,
  .show-menu .menu ul li.logomark span.pagename{
    display:none;
  }

  .show-menu ul li:before{
    display:none;
  }
}
</style>