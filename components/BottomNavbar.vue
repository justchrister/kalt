<template>
    <div class="bottom-navbar">
      <div>
        Useful links:
      </div>
      <div class="col-3 gutter-right">
        <nuxt-link to="/account/manage-cards" > manage cards </nuxt-link>
      </div>
      <div class="col-3 gutter-horizontal">
        <a href="#" > change password </a>
      </div>
      <div class="col-3 gutter-left">
        <nuxt-link to="/auth/sign-out" > sign out 👋 </nuxt-link>
      </div>
      <div class="col-3 gutter-right">
        <a href="#"> manage subscriptions </a>
      </div>
      <div class="col-3 gutter-horizontal">
        <a href="#" > change email </a>
      </div>
    </div>
</template>