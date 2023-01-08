<template>
  <div class="PageWrapper">
    <div class="page">
      <div class="section">
        <div class="message top">
          <omoji emoji="☀️"/> Welcome to the Kalt Club!
        </div>
        <div v-for="omoji of omojies" :key="omoji.id" class="message">
          <omoji :emoji="omoji.omoji" /> {{omoji.text}}
        </div>
        <div class="block send-message">
          <form @submit.prevent="sendMessage">
            <label v-if="replyTo">Replying to {{replyTo}}</label>
            <div>
            <select v-model="omojiChoice" id="omojiChoice">
              <option value="😊">😊</option>
              <option value="😄">😄</option>
              <option value="😟">😟</option>

              <option value="🙃">🙃</option>
              <option value="😲">😲</option>
              <option value="😦">😦</option>
              <option value="😉">😉</option>
              <option value="😜">😜</option>
            </select>
            <input 
              type="text" 
              v-model="omojiText" 
              placeholder="whats up?" 
              id="omojiText" 
              class="atom input-omojiText"
              @input="calculateTextLeft"
              maxlength="55" />
              {{omojiTextLeft}}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

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

  const { data: omojies, error } = reactive(await supabase
    .from('omoji-app')
    .select()
    .limit(11)
    .order('created_at', { ascending: false }))
  supabase
    .channel('public:omoji-app')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'omoji-app' }, payload => {
      omojies.unshift( payload.new )
    })
    .subscribe()
  const omojiText = ref('');
  const omojiChoice = ref('😊');
  const replyTo = ref('');
  const omojiTextLeft = ref(55);
  const calculateTextLeft = async () => { 
    omojiTextLeft.value = 55 - omojiText.value.length
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
  margin-top:2px;
  width:12%;
  border-right-color: transparent;
  border-top-right-radius:0;
  border-bottom-right-radius:0;
}
input{
  width: 80%;
  border-left-color: transparent;
  border-top-left-radius:0;
  border-bottom-left-radius:0;
}
.message{
  padding:10px 10px 12px 10px;
  margin: 5px 0;
  background:white;
  border-radius:5px;
  border:1px solid transparent;
  overflow: hidden;
  white-space: nowrap;
  max-height:25px;
}
.message:hover{

  border:1px solid black;
}
.message span{
  margin-right:15px;
}
</style>