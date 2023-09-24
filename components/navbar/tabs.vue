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
              Auto-invest
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/funds/your" >
              Your fund
          </nuxt-link>
        </li>
        <li>
          <a href="#bottom-menu">
              more...
          </a>
        </li>
      </ul>
    <div v-if="!props.hidePfp" class="pfp" :id="user.profilePicture || ''" @click="navigateTo('/profile')"></div>
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
  const supabase = useSupabaseClient();
  const userId = useSupabaseUser();
  const user = await get(supabase).user(userId.value.id);
</script>
<style scoped lang="scss">
.tabs{
  display:grid;
  grid-template-columns: 1fr $clamp-3;
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
    &#alt1{
    background-image:url('/media/images/pfp-1.png');
    }
    &#alt2{
    background-image:url('/media/images/pfp-2.png');
    }
    &#alt3{
    background-image:url('/media/images/pfp-3.png');
    }
    &#alt4{
    background-image:url('/media/images/pfp-4.png');
    }
    &#alt5{
    background-image:url('/media/images/pfp-5.png');
    }
    &#alt6{
    background-image:url('/media/images/pfp-6.png');
    }
    &#alt7{
    background-image:url('/media/images/pfp-7.png');
    }
    &#alt8{
    background-image:url('/media/images/pfp-8.png');
    }
  }
}
</style>