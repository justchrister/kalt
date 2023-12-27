<template>
    <nav :class="{'tabs':true, 'show': props.show }" >
      <ul>
        <li>
          <nuxt-link to="/portfolio" >
            Portfolio
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/invest" >
              Invest
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
    <div v-if="!props.hidePfp" class="pfp" :id="user?.profilePicture || ''" @click="navigateTo('/profile')"></div>
    </nav>
</template>


<script lang="ts" setup>
  const props = defineProps({
    hidePfp: {
      type: Boolean,
      required: false
    },
    show: {
      type: Boolean,
      default: true,
      required: false
    }
  })
  const supabase = useSupabaseClient();
  const auth = useSupabaseUser();
  const user = await get(supabase).user(auth) as user;
</script>
<style scoped lang="scss">
.tabs{
  opacity:0;
  &.show{
    opacity:1;
  }
  display:grid;
  grid-template-columns: 1fr sizer(3);
  grid-gap: sizer(1);
  margin-bottom:0;
  width: $sitewidth;
  max-width: $maxsitewidth;
  margin:0 auto;
  nav{
    width:100%;
    display: inline-block;
  }
  ul{
    margin-left:0;
  }
  ul li{
    display:inline-block;
    margin-left: sizer(2);
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
    background-image:url('/images/pfp/4.png');
    height: sizer(3);
    background-size:cover;
    background-repeat: no-repeat;
    width: sizer(3);
    border-radius:100%;
    cursor:pointer;
    border: $border;
    float:right;
    &#alt1{
    background-image:url('/images/pfp/1.png');
    }
    &#alt2{
    background-image:url('/images/pfp/2.png');
    }
    &#alt3{
    background-image:url('/images/pfp/3.png');
    }
    &#alt4{
    background-image:url('/images/pfp/4.png');
    }
    &#alt5{
    background-image:url('/images/pfp/5.png');
    }
    &#alt6{
    background-image:url('/images/pfp/6.png');
    }
    &#alt7{
    background-image:url('/images/pfp/7.png');
    }
    &#alt8{
    background-image:url('/images/pfp/8.png');
    }
  }
}
</style>