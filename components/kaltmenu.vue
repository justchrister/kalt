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
                    <nuxt-link to="/about" >
                        About
                    </nuxt-link>
                </li>
                <li v-on:click="toggleMenu">
                    <nuxt-link to="/about/how-it-works" >
                        How it works
                    </nuxt-link>
                </li>
                <li v-on:click="toggleMenu">
                    <nuxt-link to="/account/portfolio" >
                        Portfolio
                    </nuxt-link>
                </li>
                <li v-on:click="toggleMenu">
                    <nuxt-link to="/account" >
                        Account
                    </nuxt-link>
                </li>
            </ul>
        </nav><!--
        <div class="notification"></div>-->
        <nuxt-link to="/account">
            <div class="my-profile-button"></div>
        </nuxt-link>
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