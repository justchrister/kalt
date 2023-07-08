<template>
  <main>
    <block>
      <h1> Create sell order </h1>
      <div class="wrapper">
        <span>{{val}}</span>
        <span @click="remove()">-</span>
        <span @click="add()">+</span>
      </div>
      <div>
        cost: {{val*1}} EUR
      </div>
      <div>
        fee: {{val*1*0.2}} EUR
      </div>
      <div>
        total: {{val*1*1.2}} EUR
      </div>
      <div>
        <button @click="create()">
          create
        </button>
      </div>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'sell order',
    middleware: 'auth-hq'
  })
  useHead({
    title: 'sell order',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const val = ref(0)
  const loading = ref(false)
  const add = async () => { 
    val.value+=1
  }
  const remove = async () => {
    if(val.value<=0){
      val.value=0
    } else {
      val.value-=1
    }
  }
  const create = async () => {
    if(!val.value)return
    console.log(user.value.id)
    const { data, error } = await supabase
      .from('account_transactions')
      .insert({
          message_entity_id: ok.uuid(),
          message_sender: 'pages/hq/register-revenue.vue',
          user_id: user.value.id,
          amount: val.value*1.2,
          currency: 'EUR',
          transaction_type: 'deposit',
          transaction_sub_type: 'new_shares',
          transaction_status: 'payment_accepted',
          auto_invest: 1
      })
    if(error){
      ok.log('error', 'could not create transaction', error)
      loading.value = false
    } else {
      ok.log('success', 'transaction created')
      loading.value = false;
    };
  }
</script>
<style scoped lang="scss">
  
  label{
    display:block;
  }
  .wrapper{
    display:grid;
    grid-template-columns: 1fr $clamp-5 $clamp-5;
    border:$border;   
    user-select: none;
    span{
      display:inline-block;
      border:none;
      border-left:$border;
      padding:$clamp-1 0;
      min-width:$clamp-4;
      box-sizing: border-box;
      user-select: none;
      height:100%;
      text-align:center;
      &:hover{
        cursor: pointer;
        background:white;
      }
      &:first-child{
        border-left:none;
        text-align: left;
        padding-left: $clamp-2;
      }
    }
    button:hover,
    button:active,
    button:focus{
      border-radius:0;
    }
  }
</style>