<template>
    <header>
        <nav class="menu">
            <ul id="menu_items">
                <li class="logomark">
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
                    <nuxt-link to="/account/notifications" v-on:click="toggleMenu"> Notifications </nuxt-link>
                </li>
                <li v-if="!signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/auth/" v-on:click="toggleMenu"> Sign up </nuxt-link>
                </li>
                <li v-if="!signedIn">
                    <span>Kalt — </span>
                    <nuxt-link to="/auth/" v-on:click="toggleMenu"> Sign in </nuxt-link>
                </li>
                <li v-if="signedIn">
                    <span>Kalt — </span>
                    <a href="/auth/sign-out" v-on:click="toggleMenu"> Sign out </a>
                </li>
            </ul>
        </nav>
        <button class="menu-toggle" v-on:click="toggleMenu"> menu</button>
        <nuxt-link to="/portfolio">
            <div class="my-account-button"></div>
        </nuxt-link>
    </header>
</template>

<script setup>
    let signedIn = false
    const supabase = useSupabaseClient()
    const {data: {user}} = await supabase.auth.getUser()
    if(user) signedIn = true
    const toggleMenu = async () => { 
        document.getElementsByTagName("body")[0].classList.toggle("show-menu");
    }

    const props = defineProps({
        pageTitle: {
            type: String,
            required: false
        }
    })
</script>