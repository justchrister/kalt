<template>
  <main>
    <block margin="half">
      <h1>
        Let's invest in the future, today!
        <omoji emoji="✨" />
      </h1>
    </block>
    <block margin="1">
      <input-invest :uuid="uuid" type="once" />
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <input-button @click="completeTransaction()">
        Invest <loading-icon v-if="loading" />
      </input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);

  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Invest',
    ogTitle: 'Kalt - Invest',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const uuid = ok.uuid();
  const loading = ref(false)
  const completeTransaction = async () => {
    loading.value = true
    const error = await pub(supabase, {
      sender: 'pages/invest/index.vue',
      id: uuid
    }).transactions({
      userId: user.id,
      type: 'deposit',
      subType: 'card',
      status: 'pending',
      currency: user.currency || 'EUR',
      autoVest: 1
    });
    if (error) {
      ok.log('error', 'could not create transaction: '+error.message)
      loading.value = false
    } else {
      ok.log('success', 'transaction created')
      ok.sleep(250)
      loading.value = false;
      navigateTo('/portfolio')
    };
  }
</script>