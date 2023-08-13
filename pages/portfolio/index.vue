
<template>
  <main>
    <navbar-tabs />
    <frame-wrap>
      <chart-portfolio :days="days"/>
    </frame-wrap>
    <block margin="none">
      <nav class="filters">
        <div class="overflow-wrap">
          <ul><!--
            <li @click="setDays(1)">
              <span class="live-bullet">•</span> live
            </li>-->
            <li @click="days=7" 
                :class="{ active: days === 7 }">
              7 days
            </li>
            <li @click="days=30"
                :class="{ active: days === 30 }">
              1 month
            </li>
            <li @click="days=90"
                :class="{ active: days === 90 }">
              3 months
            </li>
            <li @click="days=100"
                :class="{ active: days === 100 }">
              max
            </li>
          </ul>
        </div>
      </nav>
    </block>
    <block>
      <cta :showDivest="true"/>
    </block>
    <block>
      <h3>Impact in numbers <omoji emoji="😮"/></h3>
      <p> Your investments has decreased your carbon footprint by 90 tonnes of Co2, in other words: </p>
      <div class="impacts">
        <impact type="fiat"/>
        <impact type="house"/>
        <impact type="plane" />
        <impact type="avocado"/>
      </div>
    </block>
  </main>
</template>
<script setup>
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

.filters{
  margin-top:$clamp-5;
  height:$clamp-4;
  overflow-x:scroll;
  overflow-y:hidden;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
}
.overflow-wrap{
  position: relative;
  width:$clamp-70;
  height:$clamp-6;
}

ul{
  position: absolute;
  margin-left:0;
  width:auto;
}
.live-bullet{
  color:$red;
}
li{
  display:inline-block;
  width:clamp($unit-min*7.5, $unit*7.5, $unit-max*7.5);
  text-align:center;
  border:$border;
  padding:0;
  font-size:85%;
  margin-right: $clamp;
  border-radius:$border-radius;
  position:relative;
  &:before{
    display: none;
  }
  &.active,
  &:hover{
    border-radius:100%;
    background:white;
    cursor:   pointer;
  }
  
}
/*
  .dark-mode li{
    border-color:$light;
  }
  .dark-mode li.active,
  .dark-mode li:hover{
    background:$dark;
  }
  */
</style>