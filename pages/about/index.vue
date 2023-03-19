<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="frame">
          <div class="image" style="background-image:url(/media/images/architecture/brutalist-house-in-affligem.jpg);">
          </div>
          <div class="image" style="background-image:url(/media/images/eddy-mercx-1970.jpg);">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Lets make change happen!
          </h2>
          <p>
            We let anyone be a part of solving the impending energy crisis by developing, depoloying, and letting you invest in fossil-free energy alternatives. A practical solution that works for the wallet, and the world. <br> <br>Read <nuxt-link to="questions/how-does-it-work">how it works</nuxt-link>, <nuxt-link to="about/goals">our goals</nuxt-link>, or <nuxt-link to="auth/sign-up">sign up now</nuxt-link>
          </p>
        </div>
        <Cta />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = "About us";
  const title = "Kalt — " + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference.",
    }]
  })
  
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
</script>
