<template>
    <header>
        <nav class="menu" v-on:click="toggleMenu">
            <ul id="menu_items">
            <li class="logomark">
                <nuxt-link to="/">
                <span>Kalt — </span>
                {{ pageTitle }}
                </nuxt-link>
            </li>
            <li>
                <span>Kalt — </span>
                <nuxt-link to="/about"> About </nuxt-link>
            </li>
            <li>
                <span>Kalt — </span>
                <nuxt-link to="/about/how-it-works"> How it works </nuxt-link>
            </li>
            <li>
                <span>Kalt — </span>
                <nuxt-link to="/account/portfolio"> Portfolio </nuxt-link>
            </li>
            <li>
                <span>Kalt — </span>
                <nuxt-link to="/account"> Account </nuxt-link>
            </li>
            <li>
                <span>Kalt — </span>
                <nuxt-link to="/invest"> Invest </nuxt-link>
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
};
</script>