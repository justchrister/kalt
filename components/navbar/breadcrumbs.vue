<template>
    <header>
        <nav class="menu">
            <ul id="menu_items">
                <li class="logomark" v-if="signedIn" v-on:click="toggleMenuOff">
                    <nuxt-link to="/portfolio">
                    <span>Kalt — </span>
                    {{ pageTitle }}
                    </nuxt-link>
                </li>
                <li class="logomark" v-else v-on:click="toggleMenuOff">
                    <nuxt-link to="/">
                    <span>Kalt — </span>
                    {{ pageTitle }}
                    </nuxt-link>
                </li>
                <li>
                    <span>Kalt — </span>
                    <nuxt-link to="/about" v-on:click="toggleMenu"> About </nuxt-link>
                </li>
                <li>
                    <span>Kalt — </span>
                    <nuxt-link to="/questions/how-does-it-work" v-on:click="toggleMenu"> How it works </nuxt-link>
                </li>
                <li v-if="signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/portfolio" v-on:click="toggleMenu"> Portfolio </nuxt-link>
                </li>
                <li v-if="signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/account" v-on:click="toggleMenu"> Account </nuxt-link>
                </li>
                <li v-if="!signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/auth/sign-up" v-on:click="toggleMenu"> Sign up </nuxt-link>
                </li>
                <li v-if="!signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/auth" v-on:click="toggleMenu"> Sign in </nuxt-link>
                </li>
                <li v-if="signedIn">
                    <span>Kalt — </span>
                    <a href="/auth/sign-out" v-on:click="toggleMenu"> Sign out </a>
                </li>
            </ul>
        </nav>
        
        <button class="menu-toggle" v-on:click="toggleMenu">menu</button>
        <nuxt-link to="/portfolio" v-on:click="toggleMenuOff">
            <div class="my-account-button"></div>
        </nuxt-link>
    </header>
</template>

<script setup>
    let signedIn = false
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    if(user.value) signedIn = true
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
.menu ul{
  position: fixed;
  z-index: 3;
  margin: 0;
  height: clamp($unit-min*4, $unit*4, $unit-max*4);
  overflow:hidden;
  padding: $big-clamp-half 0 0 $big-clamp-half;
  li.logomark,
  li.logomark span{
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
    span{
      font-weight:bold;
      opacity:0;
    }
    &:before{
      display:none;
    }
  }
}

header .menu-toggle,
header .menu ul li {
  font-family: $sans-serif;
  font-size:clamp($unit-min*2, $unit*2, $unit-max*2);
  font-weight:normal;
  line-height: 150%;
  font-display: optional;
}
button.menu-toggle {
  padding: $big-clamp-half;
  right: $big-clamp;
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
.my-account-button{
  width:$unit-clamp-l;
  height:$unit-clamp-l;
  display:block;
  position:fixed;
  top:$border-width;
  right:$border-width;
  background-image: url("/omoji/happy.svg");
  background-size:contain;
  background-position:center;
  box-sizing: border-box;
  margin: $big-clamp-half;
  margin-top:clamp($unit-min*2.5, $unit*2.5, $unit-max*2.5);
  &:hover{
    background-image: url("/omoji/super-happy.svg");
  }
}
</style>
<style lang="scss">
.show-menu{
  .bottom-navbar,
  .main{
    opacity:0;
    pointer-events : none;
  }
  .menu ul{
    overflow: visible;
  }
  .menu ul li{
    opacity:1;
    pointer-events : all;
  }
  header button.menu-toggle:before{
    opacity:1;
  }
}

</style>