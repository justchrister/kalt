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
          <nuxt-link to="/auth/" > sign up </nuxt-link>
          <nuxt-link to="/auth/" > sign in </nuxt-link>
          <nuxt-link to="/auth/sign-out" > sign out 👋 </nuxt-link>
        </div>
        <h4>Content:</h4>
        <div class="grid-col-3">
          <nuxt-link to="/about" > about us </nuxt-link>
          <nuxt-link to="/about/values" > our values </nuxt-link>
          <nuxt-link to="/about/mission" > our mission </nuxt-link>
          <nuxt-link to="/questions" > Q&A </nuxt-link>
          <nuxt-link to="/questions/how-does-it-work" > how it works </nuxt-link>
          <nuxt-link to="/questions/how-do-you-make-money" > how we make money </nuxt-link>
        </div>
        <div class="insignia">Make money, make a difference.</div>
    </div>
  </div>
</template>