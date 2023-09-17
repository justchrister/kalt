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
        <div class="amount">
          <div class="input-wrap">
            <input type="number" v-model="amounts.ffe" @input="adjustAmounts('ffe')"> 
          </div>
          <div class="percent">
            %
          </div>
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
        <div class="amount">
          <div class="input-wrap">
            <input type="number" v-model="amounts.art" @input="adjustAmounts('art')"> 
          </div>
          <div class="percent">
            %
          </div>
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
        <div class="amount">
          <div class="input-wrap">
            <input type="number" v-model="amounts.afh" @input="adjustAmounts('afh')"> 
          </div>
          <div class="percent">
            %
          </div>
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
        <div class="amount">
          <div class="input-wrap">
            <input type="number" v-model="amounts.smb" min="0" max="100" @input="adjustAmounts('smb')"> 
          </div>
          <div class="percent">
            %
          </div>
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
  
  const amounts = reactive({
    ffe: 25,
    art: 25,
    afh: 25,
    smb: 25
  });
  let oldAmounts = {
    ffe: 25,
    art: 25,
    afh: 25,
    smb: 25
  };
  const adjustAmounts = (changedKey) => {
    const total = Object.values(amounts).reduce((a, b) => a + b, 0);
    const change = amounts[changedKey] - oldAmounts[changedKey];
    const totalWithoutChanged = 100 - oldAmounts[changedKey];
    const otherKeys = Object.keys(oldAmounts).filter(key => key !== changedKey);
    let tot = amounts[changedKey];
    otherKeys.forEach((key) => {
      const percent = oldAmounts[key] / totalWithoutChanged;
      const newAmount = oldAmounts[key] - (change * percent);
      amounts[key] = newAmount;
      if (isNaN(amounts[key])) {
        amounts[key] = 0;
      }
    });
    const finalTotal = Object.values(amounts).reduce((a, b) => a + b, 0);
    if (finalTotal !== 100 && 100 - finalTotal >= 1) {
      amounts['art'] += (100 - finalTotal);
    }
    oldAmounts = {
      ffe: amounts.ffe,
      art: amounts.art,
      afh: amounts.afh,
      smb: amounts.smb
    };
  };
  
</script>
<style scoped lang="scss">
  .fund{
    display:grid;
    grid-template-columns: $clamp-4 1fr $clamp-8;
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
  .amount{
    display:grid;
    grid-template-columns: 1fr $clamp-4;
  }
  .amount .input-wrap{
    width:$clamp-5;
    height:$clamp-4;
    overflow:hidden;
    margin:0;
  }
  .amount .input-wrap input{
    width:$clamp-10;
    text-align:left;
    border:none;
  }
  .amount .percent{
    height:$clamp-4;
    line-height:$clamp-4;
  }
main{
  padding-top:0;
}
</style>