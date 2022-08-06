<template>
    <header>
        <a href="/">
            <button class="logo" id="logo">
                <span>Kalt</span> — {{ pageTitle }}
            </button>
        </a>
        <nav class="menu">
            <button id="menu" v-on:click="toggleMenu"> menu</button>
            <ul id="menu_items">
                <li v-on:click="toggleMenu">
                    <nuxt-link to="/invest" >
                        Invest
                    </nuxt-link>
                </li>
                <li v-on:click="toggleMenu">
                    <nuxt-link to="/about">
                        About
                    </nuxt-link>
                </li>
                <li v-on:click="toggleMenu">
                    <a v-if="$auth.loggedIn" @click="$auth.logout()">Sign out</a>
                    <a v-else @click="$auth.loginWith('auth0')">Sign in</a>
                </li>
                <li v-on:click="toggleMenu">
                    <a href="@/authenticate">
                        Create account
                    </a>
                </li>
            </ul>
        </nav>
        <div class="notification"></div>
        <a href="#" @click="$auth.loginWith('auth0')"> 
            <div class="my-profile-button"></div>
        </a>
    </header>
</template>

<script>
export default{
    name: 'Kaltmenu',
    props: ['pageTitle'],
    methods: {
        toggleMenu(){
            document.getElementsByTagName('body')[0].classList.toggle("show-menu");
        }
    },
}
</script>
<style>
</style>