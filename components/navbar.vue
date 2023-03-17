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
                <li v-if="signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/subscription" v-on:click="toggleMenu"> Subscription </nuxt-link>
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