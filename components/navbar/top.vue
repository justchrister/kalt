<template>
  <header>
    <nav class="menu">
      <ul>
        <li class="logomark" @click="toggleMenuOff()">
          <nuxt-link to="/portfolio" v-if="signedIn">
            <div class="logo"></div>
            <span>Kalt —</span>
            {{route.meta.pagename}}
          </nuxt-link>
          <nuxt-link to="/" v-else> 
            <div class="logo"></div>
            <span>Kalt —</span>
            {{route.meta.pagename}}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about" @click="toggleMenu()"> About </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/questions/how-does-it-work" @click="toggleMenu()"> How it works </nuxt-link>
        </li>
        <li v-if="signedIn">
          <nuxt-link to="/portfolio" @click="toggleMenu()"> Portfolio </nuxt-link>
        </li>
        <li v-if="!signedIn">
          <nuxt-link to="/request" @click="toggleMenu()"> Request invite </nuxt-link>
        </li>
        <li v-if="!signedIn">
          <nuxt-link to="/auth" @click="toggleMenu()"> Sign in </nuxt-link>
        </li>
        <li v-if="signedIn">
          <a href="/auth/sign-out" @click="toggleMenu()"> Sign out </a>
        </li>
      </ul>
    </nav>

    <button @click="toggleMenu()">menu</button>
  </header>
</template>

<script setup>
    const route = useRoute()
    const signedIn = ref(false)
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    if(user.value) signedIn.value = true
    if(!user.value) signedIn.value = false
    const toggleMenu = async () => { 
        document.getElementsByTagName("body")[0].classList.toggle("show-menu");
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
  header{
    position:fixed;
    width:100%;
    height:$clamp-5;
  }
.dark-mode {
   .logo{
    background:$light;
  }
   button{
    color:$light;
   }
   .show-menu header{
    height:$clamp-17;
   }
   header{
    background:$dark-95;
    border-bottom:$border-width solid $light;
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