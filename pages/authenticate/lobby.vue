<script setup lang="ts">
  const pagename = 'Lobby';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  var errormsg = ref('');
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
        <div class="frame">
          <div class="image" style="background-image:url(/images/lobby.png);">
          </div>
          <div class="image" style="background-image:url(/images/lobby_2.jpg);">
          </div>
        </div>
        </div>
        <div class="block">
          <h1>Major ten to ground control</h1>
          <p>Before we complete your first deposit, please verify your email address by clicking the link in your email. If you've already done this, click the button below.</p>
        </div>
          <Cta />
      </div>
    </div>
  </div>
</template>