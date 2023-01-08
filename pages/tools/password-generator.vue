<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h1>Your strong password:</h1>
          <input type="text" v-model="password" />
          <button @click="generatePassword(32)"> generate password </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const pagename = '404';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
  const password = ref('')
  const generatePassword = async (length) => { 
     
    // Define a string of all lowercase and uppercase letters, as well as all punctuation symbols
    const chars = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().concat('abcdefghijklmnopqrstuvwxyz').concat('!@#$%^&*()_+~`|}{[]\:;?><,./-=');

    let randomString = '';
    
    // Select n random elements from the combined string
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }
    
    password.value = randomString
  }
</script>