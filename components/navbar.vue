<template>
    <header>
        <nav class="menu">
            <ul id="menu_items">
                <li class="logomark">
                    <nuxt-link to="/">
                    <span>Kalt — </span>
                    {{ pageTitle || currentRouteName }}
                    </nuxt-link>
                </li>
                <li>
                    <span>Kalt — </span>
                    <nuxt-link to="/about" v-on:click="toggleMenu"> About </nuxt-link>
                </li>
                <li>
                    <span>Kalt — </span>
                    <nuxt-link to="/about/how-it-works" v-on:click="toggleMenu"> How it works </nuxt-link>
                </li>
                <li>
                    <span>Kalt — </span>
                    <nuxt-link to="/account/portfolio" v-on:click="toggleMenu"> Portfolio </nuxt-link>
                </li>
                <li>
                    <span>Kalt — </span>
                    <nuxt-link to="/account" v-on:click="toggleMenu"> Account </nuxt-link>
                </li>
            </ul>
        </nav>
        <button class="menu-toggle" v-on:click="toggleMenu"> menu</button>
        <nuxt-link to="/account/portfolio">
            <div class="my-account-button"></div>
        </nuxt-link>
    </header>
</template>

<script>
export default {
  name: "navbar",
  props: ["pageTitle"],
  methods: {
    toggleMenu() {
      document.getElementsByTagName("body")[0].classList.toggle("show-menu");
    },
  },

    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
};
</script>