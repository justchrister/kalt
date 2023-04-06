
<template>
  <main>
    <navbar-tabs />
    <frame-wrap>
      <chart-base-next currency="USD" :days="days"/>
    </frame-wrap>
    <block margin="half">
      <nav class="filters">
        <div class="overflow-wrap">
          <ul>
            <li @click="days.value=7">
              <span class="live-bullet">•</span> live
            </li>
            <li @click="days.value=30">
              1 month
            </li>
            <li @click="days.value=90">
              3 months
            </li>
            <li @click="days.value=180">
              6 months
            </li>
            <li @click="days.value=365">
              1 year
            </li>
            <li @click="days.value=1095">
              3 years
            </li>
            <li @click="days.value=1825">
              5 years
            </li>
            <li @click="days.value=1825">
              <!-- should be days since first investment-->
              max
            </li>
          </ul>
        </div>
      </nav>
    </block>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Portfolio'
  definePageMeta({
    pagename: 'Portfolio',
    middleware: 'auth'
  })
  useHead({
    title: 'Portfolio',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const days = ref(7)

</script>
<style scoped lang="scss">

.filters{
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
  &:hover{
    border-radius:100%;
    background:white;
    cursor:   pointer;
  }
}
</style>