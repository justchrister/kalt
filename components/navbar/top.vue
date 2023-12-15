<template>
  <header>
    <nav class="menu">
      <ul>
        <li class="logomark" @click="logoClick()">
          <div class="logo"></div>
          <span>Kalt —</span> {{route.meta.pagename}}
        </li>

        <span v-if="signedIn">
          <li>
            <nuxt-link to="/invest" @click="toggleMenu()"> Invest </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/portfolio" @click="toggleMenu()"> Portfolio </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/profile" @click="toggleMenu()"> Profile </nuxt-link>
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
          <nuxt-link to="/about" @click="toggleMenu()"> About </nuxt-link>
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

<script setup>
  const route = useRoute()
  const signedIn = ref(false)
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const toggleMenu = async () => { 
    document.getElementsByTagName("body")[0].classList.toggle("show-menu");
    if(userId.value) {
      signedIn.value = true
    } else {
      signedIn.value = false
    }
  }
  const toggleMenuOff = async () => { 
    document.getElementsByTagName("body")[0].classList.remove("show-menu");
  }
  const props = defineProps({
    pageTitle: {
      type: String,
      required: false
    }
  })
  const logoClick = async () => {
    if(signedIn.value) {
      navigateTo('/portfolio')
    } else {
      navigateTo('/')
    }
  }
</script>
<style scoped lang="scss">

  .logo{
    width:$clamp-2;
    height:$clamp-2;
    display:block;
    position:fixed;
    top:$border-width;
    left:$border-width;
    background:$dark;
    border-radius:100%;
    margin: clamp($unit-min*1.4, $unit*1.4, $unit-max*1.4) $clamp;
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
    height:$clamp-5;
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
  content:'Kalt — ';
  font-weight:bold;
  display:inline;
}
.menu ul{
  position: fixed;
  z-index: 3;
  margin: 0;
  height: $clamp-4;
  overflow:hidden;
  padding: $clamp $clamp-2 $clamp $clamp-4;
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
.menu ul.col-2{
  margin-top:$clamp-3;
  margin-left:$clamp-25;
  padding-left:0;
  li::before{
    content:'';
    display:none;
  }
}

button,
li {
  font-family: $sans-serif;
  font-size:$clamp-2;
  font-weight:normal;
  line-height: 150%;
  font-display: optional;
}
button {
  padding: $clamp;
  right: $clamp;
  position: fixed;
  top: $border-width;
  width: auto;
  color: $dark;
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