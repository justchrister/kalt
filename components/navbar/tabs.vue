<template>
  <block margin="none">
    <nav class="tabs">
      <ul>
        <li>
          <nuxt-link to="/portfolio" >
            Portfolio
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account" >
              Account
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/notifications" >
              Notifications
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/cards" >
              Cards
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/subscription" >
              Subscription
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </block>
</template>
<style scoped lang="scss">
.tabs{
  margin-bottom:0;
  nav{
    width:100%;
    display: inline-block;
  }
  ul{
    margin-left:0;
  }
  ul li{
    display:inline-block;
    margin-left: clamp($unit-min*2, $unit*2, $unit-max*2);
    padding: 0;
    line-height:1.5;
    margin-right:0;
  }
  ul li:first-child{
    margin-left:0;
  }
  ul li:before{
    display:none;
    content: "";
  }
}
</style>