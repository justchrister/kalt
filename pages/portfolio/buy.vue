
<template>
  <div class="PageWrapper">
    <div class='page'>
      <div class="section" id="about">
        <div class="block">
          Select the amount you want to invest: 
          <select-amount :uuid="new_order_id" />
          select dfeault card: 
          <nuxt-link to="/account/manage-cards">
            <default-card />
          </nuxt-link>
          <button @click="buyOrder"> buy </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

/*


1. Check if an incomplete one exists,
2. If no, create new one by isnerting
3. If yes, continue that one
4. Create an order 

then we need to change the create order to not accept number of ddf but with currency exchange rate conversion


*/



  const pagename = 'Buy';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()
  
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
  definePageMeta({
    layout: "focused",
  });

  const { data: new_order_id } = await useLazyAsyncData('cards', async () => {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        'user_id': user.id
      })
      .select('pay_id')
      .single()
    return data.pay_id
  })
  console.log(new_order_id)
  const buyOrder = async () => { 

  }

</script>