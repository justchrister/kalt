<template>
    <header>
        <a href="/">
            <button class="logo" id="logo">
                <span>Kalt</span> — {{ pageTitle }}
            </button>
        </a>
        <nav class="menu" v-on:click="toggleMenu">
            <button id="menu"> menu</button>
            <ul id="menu_items">
                <li>
                    <nuxt-link to="/about" >
                        <span>Kalt — </span>
                        About
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/about/how-it-works" >
                        <span>Kalt — </span>
                        How it works
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/account/portfolio" >
                        <span>Kalt — </span>
                        Portfolio
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/account" >
                        <span>Kalt — </span>
                        Account
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/invest" >
                        <span>Kalt — </span>
                        Invest 
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
    name: 'navbar',
    props: ['pageTitle'],
    methods: {
        toggleMenu(){
            document.getElementsByTagName('body')[0].classList.toggle("show-menu");
        }
    },
}
</script>