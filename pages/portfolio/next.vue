
<template>
  <main>
    <block margin="none">
      <strong> {{ user.firstName }} {{ user.lastName }}</strong>
    </block>
    <frame>
      <chart :days="days" />
    </frame>
    <block margin="none">
      <nav class="filters">
        <div class="overflow-wrap">
          <ul>
            <li @click="setDays('thisMonth')" :class="{ active: active === 'thisMonth' }">
              this month
            </li>
            <li @click="setDays('91Days')" :class="{ active: active === '91Days' }">
              3 months
            </li>
            <li @click="setDays('thisYear')" :class="{ active: active === 'thisYear' }">
              this year
            </li>
            <li @click="setDays('fromStart')" :class="{ active: active === 'fromStart' }">
              from start
            </li>
          </ul>
        </div>
      </nav>
    </block>
    <block margin="4">
      <cta :showDivest="true" />
    </block>
    <block>
      <invites :user="user" />
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
  const days = ref(30)
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);
  const daysSoFarThisYear = () => {
    return Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  }
  const daysSoFarThisMonth = () => {
    return Math.floor((new Date() - new Date(new Date().getFullYear(), new Date().getMonth(), 0)) / 1000 / 60 / 60 / 24);
  }
  const active = ref('thisMonth');
  const setDays = (range) => {
    active.value = range;
    if (range === 'thisMonth') {
      days.value = daysSoFarThisMonth();
    } else if(range==='91Days'){
      days.value = 91
    } else if(range==='thisYear'){
      days.value = daysSoFarThisYear();
    } else if(range==='fromStart'){
      days.value = 99999999999
    } 
  }
  setDays('thisMonth')
</script>
<style scoped lang="scss">
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