<template>
  <main>
      <block margin="half">
        <h1> 
          We are currently in invite only <code> beta </code>
        </h1>
        <p>
          If you would like to join, please fill out the form below, or reach out at <a href="mailto:sup@ka.lt">sup@ka.lt</a>.
        </p>
        <p>
          Navigating the complex securities regulations around the world means we have to do a lot of manual work in the beginning to be in accordance with know your customer and data protection legislation. 
        </p>
        <p>
          Thank you for your patience.
        </p>
      </block>
      <block>
        <form>
          <label for="email">
            Email
          </label>
          <input type="email">
          <label for="firstname">
            First name
          </label>
          <input type="text">
          <label for="lastname">
            Last name
          </label>
          <input type="text">
          <label for="country">
            Country
          </label>
          <input type="text">
          <button>request invite</button>
        </form>
      </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Request invite',
    middleware: 'auth'
  })
  useHead({
    title: 'Request invite',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>