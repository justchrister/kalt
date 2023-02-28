<template>
<div class="page bottom-navbar-wrapper">
    <div class="bottom-navbar">
        <h4>Account:</h4>
        <div class="grid-col-3">
          <nuxt-link to="/portfolio" > Portfolio </nuxt-link>
          <nuxt-link to="/account" > Account </nuxt-link>
          <nuxt-link to="/account/notifications" > Notifications </nuxt-link>
          <nuxt-link to="/account/transactions" > Transactions </nuxt-link>
          <nuxt-link to="/account/cards" > Cards </nuxt-link>
          <nuxt-link to="/subscription" > Subscription </nuxt-link>
          <nuxt-link to="/auth/" > Sign up </nuxt-link>
          <nuxt-link to="/auth/" > Sign in </nuxt-link>
          <nuxt-link to="/auth/sign-out" > Sign out 👋 </nuxt-link>
        </div>
        <h4>Content:</h4>
        <div class="grid-col-3">
          <nuxt-link to="/about" > About us </nuxt-link>
          <nuxt-link to="/about/values" > Our values </nuxt-link>
          <nuxt-link to="/about/mission" > Our mission </nuxt-link>
          <nuxt-link to="/questions" > Q&A </nuxt-link>
          <nuxt-link to="/questions/how-does-it-work" > How it works </nuxt-link>
          <nuxt-link to="/questions/how-do-you-make-money" > How we make money </nuxt-link>
        </div>
        <div class="insignia">Make money, make a difference.</div>
    </div>
  </div>
</template>