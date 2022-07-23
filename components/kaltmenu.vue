<template>
    <header>
        <a href="/">
            <button class="logo" id="logo">
                <span>Kalt</span> — {{ pageTitle }}
            </button>
        </a>
        <nav class="menu">
            <button id="menu" v-on:click="showMenu"> menu</button>
            <ul id="menu_items">
                <li>
                    <a href="@/invest">
                        Invest
                    </a>
                </li>
                <li>
                    <a href="@/about">
                        About
                    </a>
                </li>
                <li>
                    <a v-if="$auth.loggedIn" @click="$auth.logout()">Sign out</a>
                    <a v-else @click="$auth.loginWith('auth0')">Sign out</a>
                </li>
                <li>
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
        showMenu(){
            document.getElementsByTagName('body')[0].classList.toggle("show-menu");
        }
    },
}
</script>
<style>
</style>