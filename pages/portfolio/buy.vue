
<template>
  <main>
    <block>
      <h3>Let's invest!  <omoji emoji="☀️" /></h3>
      <form @submit.prevent="completeTransaction">
        <input-amount-invest :uuid="uuid"/>
        <default-card />
        <button @click="completeTransaction"> buy </button>
      </form>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Invest',
    layout: 'focused',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const uuid = ok.uuid();

  const completeTransaction = async () => {
    const { data, error } = await supabase
      .from('account_transactions')
      .insert({
        'message_entity_id': uuid,
        'user_id': user.value.id,
        'transaction_type': 0
      })

  }

</script>