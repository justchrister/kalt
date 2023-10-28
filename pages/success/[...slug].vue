<template>
  <main>
    <block margin="half">
      <success-banner />
    </block>
    <block>
      <button @click="goBack()">
        ← back
      </button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Success',
    middleware: 'auth'
  })
  useHead({
    title: 'Success',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })

  const route = useRoute()
  const goBack = async () => {
    clearTimeout(timer1);
    const url = await generateUrl(); // Wait for the URL to be generated
    if (!url) {
      ok.log('', 'no url');
      navigateTo('/');
    } else {
      ok.log('', 'yay url', url);
      navigateTo(url);
    }
  };

  const generateUrl = async () => {
    let url = '/'
    for (let i = 0; i < route.params.slug.length; i++) {
      url += route.params.slug[i] + '/'
    }
    return url
  }
  const url = await generateUrl();
  var timer1 = setTimeout(function() {
    goBack();
  }, 1500);

</script>
<style scoped lang="scss">
</style>