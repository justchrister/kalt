<script setup lang="ts">
const pagename = 'Subscription';
const title = 'Kalt — ' + pagename;
const description = ref('My App Description')
const client = useSupabaseClient()
const user = useSupabaseUser()
const day = ref(15)
const invest_id = ref('')

useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }]
})

definePageMeta({
  middleware: ['auth']
})


onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/auth')
    }
  })
})

const { data: exists, error } = await client
  .from('cache_invest')
  .select('invest_id, day')
  .eq('user_id', user.value.id)


if(exists[0]){
  if(exists[0].invest_id) invest_id.value = exists[0].invest_id
  if(exists[0].day) day.value = exists[0].day
} else {
    navigateTo('/invest')
}

// if we cannot find the investment in the cache, we need to revert the user back to the first page


async function updateCache() {
  try {
    const { data, error } = await client
      .from('cache_invest')
      .upsert({
        invest_id: invest_id.value, 
        reoccuring: true,
        day: day.value,
        user_id: user.value.id
      })
      .select()
  } catch (error) {
    console.log(error)
  } finally {
    navigateTo('/invest/payment')
  }
}
</script>
<template>
  <div class="PageWrapper">
    <navbar :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <form @submit.prevent="updateCache">
        <p> Choose the of the month you would like to invest:</p>
            <input id="a" type="radio" value="1"  v-model="day" name="day"/><label for="a">1 </label>
            <input id="b" type="radio" value="2"  v-model="day" name="day"/><label for="b">2 </label>
            <input id="c" type="radio" value="3"  v-model="day" name="day"/><label for="c">3 </label>
            <input id="d" type="radio" value="4"  v-model="day" name="day"/><label for="d">4 </label>
            <input id="e" type="radio" value="5"  v-model="day" name="day"/><label for="e">5 </label>
            <input id="f" type="radio" value="6"  v-model="day" name="day"/><label for="f">6 </label>
            <input id="g" type="radio" value="7"  v-model="day" name="day"/><label for="g">7 </label>
            <input id="h" type="radio" value="8"  v-model="day" name="day"/><label for="h">8 </label>
            <input id="i" type="radio" value="9"  v-model="day" name="day"/><label for="i">9 </label>
            <input id="j" type="radio" value="10" v-model="day" name="day"/><label for="j">10</label>
            <input id="k" type="radio" value="11" v-model="day" name="day"/><label for="k">11</label>
            <input id="l" type="radio" value="12" v-model="day" name="day"/><label for="l">12</label>
            <input id="m" type="radio" value="13" v-model="day" name="day"/><label for="m">13</label>
            <input id="n" type="radio" value="14" v-model="day" name="day"/><label for="n">14</label>
            <input id="o" type="radio" value="15" v-model="day" name="day"/><label for="o">15</label>
            <input id="p" type="radio" value="16" v-model="day" name="day"/><label for="p">16</label>
            <input id="q" type="radio" value="17" v-model="day" name="day"/><label for="q">17</label>
            <input id="r" type="radio" value="18" v-model="day" name="day"/><label for="r">18</label>
            <input id="s" type="radio" value="19" v-model="day" name="day"/><label for="s">19</label>
            <input id="t" type="radio" value="20" v-model="day" name="day"/><label for="t">20</label>
            <input id="u" type="radio" value="21" v-model="day" name="day"/><label for="u">21</label>
            <input id="v" type="radio" value="22" v-model="day" name="day"/><label for="v">22</label>
            <input id="w" type="radio" value="23" v-model="day" name="day"/><label for="w">23</label>
            <input id="x" type="radio" value="24" v-model="day" name="day"/><label for="x">24</label>
            <input id="y" type="radio" value="25" v-model="day" name="day"/><label for="y">25</label>
            <input id="z" type="radio" value="26" v-model="day" name="day"/><label for="z">26</label>
            <input id="A" type="radio" value="27" v-model="day" name="day"/><label for="A">27</label>
            <input id="B" type="radio" value="28" v-model="day" name="day"/><label for="B">28</label>
            <input id="C" type="radio" value="29" v-model="day" name="day"/><label for="C">29</label>
            <input id="D" type="radio" value="30" v-model="day" name="day"/><label for="D">30</label>
            <input id="E" type="radio" value="31" v-model="day" name="day"/><label for="E">31</label>
            <input type="submit" value="payment →">
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
    label{
        display:inline-block;
        margin:0 10px 10px 0;
        width:11%;
        text-align:center;
        border:1px dashed gray;
        border-radius:4px;

    }
    label:hover{
      border:1px solid black;
    }
    input[type="radio"] {
    display: none;
    }      

    input[type="radio"]:checked+label {
      border:1px solid black;
        font-weight:500;
    }
</style>