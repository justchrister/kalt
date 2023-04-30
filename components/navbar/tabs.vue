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
          <nuxt-link to="/subscription" >
              Subscription
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/accounts" >
              Accounts
          </nuxt-link>
        </li>
      </ul>
    <div v-if="!props.hidePfp" class="pfp" @click="navigateTo('/profile')"></div>
    </nav>
  </block>
</template>


<script lang="ts" setup>
const props = defineProps({
    hidePfp: {
      type: Boolean,
      required: false
    }
  })

</script>
<style scoped lang="scss">
.tabs{
  display:grid;
  grid-template-columns: 1fr $clamp-4;
  grid-gap: $clamp;
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
    margin-left: $clamp-2;
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
  .pfp{
    background-image:url('/media/images/pfp-4.png');
    height:$clamp-3;
    background-size:contain;
    background-repeat: no-repeat;
    width:$clamp-3;
    border-radius:100%;
    cursor:pointer;
    border:$border;
    float:right;
  }
}
</style>