<template>
  <main>
    <intro title="Build your own fund" paragraph="Choose what you want to invest in both through your subscription and when completing single investments." />
    <block>
      <div class="fund">
        <div class="icon">
          <span id="art">
          </span>
        </div>
        <div class="name">
          Fossil-free energy fund
        </div>
        <div class="amount" @click="adjustAmount('ffe')">
          <span :class="{ active: amounts.ffe >= 1}"></span>
          <span :class="{ active: amounts.ffe >= 2}"></span>
          <span :class="{ active: amounts.ffe >= 3}"></span>
        </div>
      </div>
      <div class="fund">
        <div class="icon">
          <span id="art">
          </span>
        </div>
        <div class="name">
          Art fund
        </div>
        <div class="amount" @click="adjustAmount('art')">
          <span :class="{ active: amounts.art >= 1}"></span>
          <span :class="{ active: amounts.art >= 2}"></span>
          <span :class="{ active: amounts.art >= 3}"></span>
        </div>
      </div>
      <div class="fund">
        <div class="icon">
          <span id="art">
          </span>
        </div>
        <div class="name">
          Affordable housing fund
        </div>
        <div class="amount" @click="adjustAmount('afh')">
          <span :class="{ active: amounts.ah >= 1}"></span>
          <span :class="{ active: amounts.ah >= 2}"></span>
          <span :class="{ active: amounts.ah >= 3}"></span>
        </div>
      </div>
      <div class="fund">
        <div class="icon">
          <span id="art">
          </span>
        </div>
        <div class="name">
          Small and medium sized business fund
        </div>
        <div class="amount" @click="adjustAmount('smb')">
          <span :class="{ active: amounts.smb >= 1}"></span>
          <span :class="{ active: amounts.smb >= 2}"></span>
          <span :class="{ active: amounts.smb >= 3}"></span>
        </div>
      </div>
      <div class="fund">
        <div class="icon">
          <span id="art">
          </span>
        </div>
        <div class="name">
          Venture capital fund
        </div>
        <div class="amount" @click="adjustAmount('vc')">
          <span :class="{ active: amounts.vc >= 1}"></span>
          <span :class="{ active: amounts.vc >= 2}"></span>
          <span :class="{ active: amounts.vc >= 3}"></span>
        </div>
      </div>
      <button>
        done
      </button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Custom Index',
    middleware: 'auth'
  })
  useHead({
    title: 'Custom Index',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  let amounts = reactive({
    art: 2,
    ffe: 3,
    ah: 1,
    vc: 0,
    smb: 1
  })
  const adjustAmount = (fund) => {
    if(amounts[fund]===3){
      amounts[fund] = 0
    } else {
      amounts[fund] = amounts[fund] + 1
    }
  }
</script>
<style scoped lang="scss">
  .fund{
    display:grid;
    grid-template-columns: $clamp-4 1fr $clamp-5;
    border:$border;
    padding:$clamp-1;
    line-height:$clamp-4;
    margin-bottom:$clamp-1;
  }
  .icon{
    #art{
      height:$clamp-4;
      width:$clamp-3;
      display:block; 
      background:url('/media/icons/funds/art.svg') no-repeat center center;
      background-size:contain;
    }
  }
  .amount span{
    width:$clamp-1;
    height:$clamp-1;
    margin-right:$clamp-0-5;
    display:inline-block;
    background:url('/omoji/heart-outline.svg') no-repeat center center;
    background-size:contain;
  }
  .amount span.active{
    background:url('/omoji/heart-filled.svg') no-repeat center center;
    background-size:contain;
  }
main{
  padding-top:0;
}
</style>