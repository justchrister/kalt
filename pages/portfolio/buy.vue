
<template>
  <main>
    <block>
      <h3>Let's invest!  <omoji emoji="☀️" /></h3>
      <input-amount-invest :uuid="uuid"/>
      <br/>
      <label>Choose card to charge: </label>
      <nuxt-link to="/profile/cards">
        <default-card />
      </nuxt-link>
      <br/>
      <button @click="completeTransaction"> buy </button>
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