<template>
  <main>
    <block>
      <h1>How much do you expect to invest monthly?</h1>
      <div :class="{'choice first': true, 'selected': first}"  @click="select('first')">Under 200$</div>
      <div :class="{'choice second': true, 'selected': second}"  @click="select('second')">200$ — 500$</div>
      <div :class="{'choice third': true, 'selected': third}"  @click="select('third')">500$ — 1,000$</div>
      <div :class="{'choice fourth': true, 'selected': fourth}"  @click="select('fourth')">Over 1,000$</div>
      <nuxt-link to="/invite/request/email"> 
        <button class="next"> Next -> </button>
      </nuxt-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Request invite'
  })
  useHead({
    title: 'Request invite',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const requestUuid = useCookie('requestUuid')
  requestUuid.value = ok.uuid()
  
  const first = ref(true);
  const second = ref(false);
  const third = ref(false);
  const fourth = ref(false);

  const select = async (investAmount: any) => {
    if(investAmount==='first'){
      first.value = true;
      second.value = false;
      third.value = false;
      fourth.value = false;
    } else if (investAmount==='second'){
      first.value = false;
      second.value = true;
      third.value = false;
      fourth.value = false;
    } else if (investAmount==='third'){
      first.value = false;
      second.value = false;
      third.value = true;
      fourth.value = false;
    } else if (investAmount==='fourth'){
      first.value = false;
      second.value = false;
      third.value = false;
      fourth.value = true;
    }
    let monthlyInvestFrom = 200;
    let monthlyInvestTo = 200;
    if(second.value){
      monthlyInvestFrom = 200;
      monthlyInvestTo = 500;
    } else if (third.value){
      monthlyInvestFrom = 500;
      monthlyInvestTo = 1000;
    } else if (fourth.value){
      monthlyInvestFrom = 1000;
      monthlyInvestTo = 100000;
    }
    const { error, data } = await pub(supabase, {
      "sender":"pages/invite/request/index.vue",
      "entity": requestUuid.value
    }).requestAccess({
      monthlyInvestFrom,
      monthlyInvestTo
    });
    if(error){
      ok.log('error', 'could not request access '+error.message)
    } else {
      ok.log('success', 'requested access')
    }
  }

</script>
<style scoped lang="scss">
  
.choice{
  display: grid;
  grid-template-columns: 1fr sizer(4) sizer(4) sizer(4);
  width: 100%;
  height: sizer(6);
  border: $border;
  border-color: $dark-40;
  box-sizing: border-box;
  margin-bottom: sizer(1);
  padding: sizer(1) sizer(1.5);
  background-color:primaryColor(1%);
  border-radius:2px;
  transition: border-color 150ms $easing-in;
  
}

.choice:hover{
  background-color:primaryColor(2%);
  border-color: $dark-60;
  transition: border-color 150ms $easing-in;
  cursor: pointer;
}
.choice.selected{
  background-color:primaryColor(5%);
  border-color: $dark-60;
  transition: border-color 150ms $easing-in;
}

</style>