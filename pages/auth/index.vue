<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <button class="atom square" @click="navigateTo('/auth/sign-up')">
            sign up →
          </button>
          <button class="atom square" @click="navigateTo('/auth/sign-in')">
            sign in →
          </button>
        </div>
        <div class="block">
          <button class="atom square" @click="navigateTo('/')">
            homepage →
          </button>
          <button class="atom square" @click="navigateTo('/about/how-it-works')">
            how it works →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = 'Authenticate';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  var errormsg = ref('');

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

  const client = useSupabaseClient()
  const user = useSupabaseUser()
</script>