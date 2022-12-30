
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <tabs/>
          <div class="message">
            <div class="profile-picture caleb"></div>
            <div class="message-summary">
              <div class="by-line">Caleb Miller Brown — CFO @ Kalt<span class="date">30.12.2022</span></div>
              <div class="message-title">Time to start giving back</div>
            </div>
          </div>
          <div class="message">
            <div class="profile-picture christer"></div>
            <div class="message-summary">
              <div class="by-line">Christer — CEO and Founder @ Kalt<span class="date">11.12.2022</span></div>
              <div class="message-title">Welcome to the Kalt Club! <omoji emoji="☀️"/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
    const pagename = 'Transactions';
    const title = 'Kalt — ' + pagename;
    const description = ref('My App Description')

    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    })
</script>
<style scoped>
.message{
  padding:15px;
  border:1px solid black;
  border-radius:3px;
  margin:15px 0px;
  height:50px;
}
.message:hover{

  background:white;
  cursor: pointer;
}
.message:hover .message-title{
  text-decoration:underline;
}
.profile-picture{
  width:50px;
  height:50px; 
  display:inline-block;
  background-size:contain;
  border-radius:50%;
}
.profile-picture.caleb{
  background-image: url('../media/people/caleb.jpg');
}
.profile-picture.christer{
  background-image: url('../media/people/christer.jpeg');
}
.message-summary{
  width:600px; 
  margin-left:20px;
  display:inline-block;
  height:50px; 
  overflow:hidden;
}
.message-summary .by-line{
  vertical-align:top;
  font-family: 'Source Code Pro', monospace;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1.5;
  font-size:60%;

}
.date{
  text-align:right;
  float:right;
}
</style>