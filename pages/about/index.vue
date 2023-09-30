<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/architecture/brutalist-house-in-affligem.jpg" />
      <frame-image src="/media/images/eddy-mercx-1970.jpg" />
    </frame-wrap>
    <block margin="half">
      <h1>
        Be the change you want to see in the world
      </h1>
      <p>
        We offer an accessible platform for investing in clean, green, fossil-free energy, empowering you to make money while making a difference. Our goal is to accelerate the global transition to sustainable energy sources, fostering a better future for our planet.
      </p>
      <p>
        By investing with us, you directly contribute to the development and deployment of fossil-free energy alternatives. Together, we can create a more sustainable world while enjoying the financial benefits of supporting fossil-free energy solutions.
      </p>
      <p>
        Read <nuxt-link to="questions/how-does-it-work">how it works</nuxt-link> or <nuxt-link to="about/values">our values and goals</nuxt-link>
      </p>
    </block>
    <block>
      <cta />
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'About us',
    middleware: 'default'
  })
  useHead({
    title: 'About us'
  })
  
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  const portfolio = await get(supabase).portfolio(user.user)
  ok.log('success', 'Got portfolio: ', portfolio)
</script>
