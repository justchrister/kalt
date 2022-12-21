<template>
<div>
  <div class="block">
    <nav>
      <ul>
        <li>
          <nuxt-link to="/account/portfolio" >
            Portfolio
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account" >
              Account
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/transactions" >
              Transactions
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/notifications" >
              Notifications
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</div>
</template>
<style scoped>
  nav{
    width:100%;
    font-size:70%;
    display: inline-block;
  }
  ul{
    margin-left:0;
  }
  ul li{
    display:inline-block;
    margin-left: 5%;
    padding: 0 2px;
    line-height:1.5;
    border-bottom:2px solid black;
  }
  ul li:first-child{
    margin-left:0;
  }
  ul li:before{
    display:none;
    content: "";
  }
  ul li a {
    text-decoration: none;
  }
</style>