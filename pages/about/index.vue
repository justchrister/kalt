<template>
  <main>
    
    <div class="page">
      <div class="frame">
        <div class="image" style="background-image:url(/media/images/architecture/brutalist-house-in-affligem.jpg);">
        </div>
        <div class="image" style="background-image:url(/media/images/eddy-mercx-1970.jpg);">
        </div>
      </div>
      <div class="block">
        <h2 class="title">
          Be the change you want to see in the world
        </h2>
        <p>
          We offer an accessible platform for investing in clean, green, fossil-free energy, empowering you to make money while making a difference. Our goal is to accelerate the global transition to sustainable energy sources, fostering a better future for our planet.
        </p>
        <p>
          By investing with us, you directly contribute to the development and deployment of fossil-free energy alternatives. Together, we can create a more sustainable world while enjoying the financial benefits of supporting renewable energy solutions.
        </p>
        <p>
        <!--
          We let anyone be a part of solving the impending energy crisis by developing, depoloying, and letting you invest in fossil-free energy alternatives. A practical solution that works for the wallet, and the world. <br>--> <br>Read <nuxt-link to="questions/how-does-it-work">how it works</nuxt-link>, <nuxt-link to="about/values">our values and goals</nuxt-link>, or <nuxt-link to="auth/sign-up">sign up now</nuxt-link>
        </p>
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
