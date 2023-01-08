
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
      .from('transactions')
      .insert({
        'user_id': user.id,
        'transaction_type': 0
      })
      .select('transaction_id')
      .single()
    return data.transaction_id
  })

</script>