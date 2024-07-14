
<template>
  <main>
    <frame width="wide">
      <chart/>
    </frame>
    <block margin="1" v-if="!profileSetUp">
      <profile-card :user="user" />
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="4">
      <cta :showDivest="true" />
    </block>
    <block margin="4">
      <invites :user="user" />
    </block>
    <block margin="4" v-if="profileSetUp">
      <profile-card :user="user" />
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Portfolio',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Portfolio',
    ogTitle: 'Kalt - Portfolio',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);

  const isProfileSetUp = (userObj) => {
    switch (userObj){
      case userObj == null:
        console.log('no user')
        return false;
      case userObj.firstName == null:
        console.log('missing first name')
        return false;
      case userObj.lastName == null:
        console.log('missing last name')
        return false;
      case userObj.birthdate == null:
        console.log('missing birthdate')
        return false;
      case userObj.city == null:
        console.log('missing city')
        return false;
      case userObj.country == null:
        console.log('missing country')
        return false;
      default:
        return true;
    }
  }
  const profileSetUp = isProfileSetUp(user) || false;
</script>
<style scoped lang="scss">
  main{
    padding-top:sizer(8);
  }
  .filters {
    margin-top: sizer(5);
    height: sizer(5);
    overflow-x: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
      /* make scrollbar transparent */
    }
  }
  .overflow-wrap {
    position: relative;
    width: sizer(70);
    height: sizer(6);
  }

  ul {
    position: absolute;
    margin-left: 0;
    width: auto;
  }

  .live-bullet {
    color: red(100%);
  }

  li {
    display: inline-block;
    width: sizer(7.5);
    text-align: center;
    border: $border;
    padding: 0;
    font-size: 85%;
    margin-right: sizer(1);
    border-radius: $border-radius;
    position: relative;

    &:before {
      display: none;
    }

    &.active,
    &:hover {
      border-radius: 100%;
      background: white;
      cursor: pointer;
    }
  }
</style>