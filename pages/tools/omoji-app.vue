<template>
  <div class="PageWrapper">
    <div class="page">
      <div class="section">
        <div v-for="omoji of omojies" :key="omoji.id" class="message">
          <div> <omoji :emoji="omoji.omoji" /> <span style="margin-right:5px;"> </span>{{omoji.text}} </div>
        </div>
        <div class="block send-message">
          <form @submit.prevent="sendMessage">
            <label v-if="replyTo">Replying to {{replyTo}}</label>
            <div>
            <select v-model="omojiChoice" id="omojiChoice">
              <option value="😊">😊</option>
              <option value="😄">😄</option>
              <option value="😟">😟</option>
            </select>
            <input 
              type="text" 
              v-model="omojiText" 
              placeholder="whats up?" 
              id="omojiText" 
              class="atom input-omojiText"
              @input="calculateTextLeft"
              maxlength="50" />
              {{omojiTextLeft}}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

onMounted(() => {
  window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});
  definePageMeta({
    layout: "focused",
  });

  const supabase = useSupabaseClient()
  const pagename = "Omoji app";
  const title = "Kalt — " + pagename;

  useHead({
    title,
    meta: [{
      name: "description",
      content: "lol",
    },],
  });

  const { data: omojies } = await useLazyAsyncData('omojies', async () => {
    const { data, error } = await supabase
      .from('omoji-app')
      .select()
    return data
  })


  const omojiText = ref('');
  const omojiChoice = ref('😊');
  const replyTo = ref('');
  const omojiTextLeft = ref(50);
  const calculateTextLeft = async () => { 
    omojiTextLeft.value = 50 - omojiText.value.length
  }
  const setReplyTo = async (replyId) => { 
     replyTo.value=replyId
  }
  const sendMessage = async () => {
    const { data, error } = await supabase
    .from('omoji-app')
    .insert({ 
      omoji: omojiChoice.value,
      text: omojiText.value,
      replying_to: null
    })
    omojiText.value = ''
    replyTo.value = ''
    refreshNuxtData()
  }
  
</script>
<style scoped>
.send-message{
  position:fixed;
  width: 86vw;
  max-width: 720px;
  margin: 0 auto;
  bottom:0px;
  padding-bottom:15px;
  background:#FCF9F2;
}

select,
input{
  display:inline-block;
}
select{
  width:12%;
}
input{
  width: 70%;
}
.message{
  padding:10px;
  margin: 5px 0;
  background:white;
  border-radius:5px;
  border:1px solid transparent;
}
.message:hover{

  border:1px solid black;
}
</style>