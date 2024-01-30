
<template>
  <main>
    <navbar-tabs />
    <frame>
      <chart-portfolio :days="days" />
    </frame>
    <block margin="none">
      <nav class="filters">
        <div class="overflow-wrap">
          <ul><!--
            <li @click="setDays(1)">
              <span class="live-bullet">•</span> live
            </li>-->
            <li @click="days = 7" :class="{ active: days === 7 }">
              7 days
            </li>
            <li @click="days = 30" :class="{ active: days === 30 }">
              1 month
            </li>
            <li @click="days = 90" :class="{ active: days === 90 }">
              3 months
            </li>
            <li @click="days = 180" :class="{ active: days === 180 }">
              6 months
            </li>
            <li @click="days = 365" :class="{ active: days === 365 }">
              1 year
            </li>
            <li @click="days = 3650" :class="{ active: days === 3650 }">
              max
            </li>
          </ul>
        </div>
      </nav>
    </block>
    <block margin="1">
      <cta :showDivest="true" />
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Portfolio',
    middleware: 'auth'
  })
  useHead({
    title: 'Portfolio'
  })
  const days = ref(30)
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