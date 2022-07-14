<!-- I was told the naming "header.vue" may create a conflict with the <header> html tag -->
<template>
    <header>
        <a href="/">
            <button class="logo" id="logo">
                <span>Kalt</span> — Something
            </button>
        </a>
        <nav class="menu">
            <button id="menu" v-on:click="showMenu"> menu</button>
            <ul id="menu_items">
                <li>
                    <a href="../values">
                        Values
                    </a>
                </li>
                <li>
                    <a href="../brand">
                        Brand
                    </a>
                </li>
                <li>
                    <a href="../solutions">
                        Solutions
                    </a>
                </li>
                <li>
                    <a href="../questions">
                        Questions
                    </a>
                </li>
            </ul>
        </nav>
        <div class="notification"></div>
        <a href="../authenticate"> 
            <div class="my-profile-button"></div>
        </a>
    </header>
</template>

<script>
export default{
    props: {
        kaltHeaderTitle: String,
    },
    methods: {
        showMenu(){
            document.getElementsByTagName('body')[0].classList.toggle("show-menu");
        }
    },
}
</script>

<style>
</style>