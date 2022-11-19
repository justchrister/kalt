<script setup lang="ts">


definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient()
const user = useSupabaseUser()

const frequency = ref(true);

const years = 40;
const thisYear = new Date().getFullYear();
const deposit = ref(2000);
const rateText = ref('Monthly');
let calcedArr = [];


onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate')
    }
  })
})
// should probably find a way to push the value into the array automatically but this will do for now
const compound = (principalAmount, monthly) => {

    let interestRate = 8;
    let monthlyDeposit
    if (monthly === true){
        monthlyDeposit = principalAmount;
    } else {
        monthlyDeposit = 0;
    }
    for (let i = 0; i < years; i++) {
      // Runs 5 times, with values of step 0 through 4.
      let year = (i+1);
      calcedArr.push((principalAmount*Math.pow((1+(interestRate/100/12)),(12*year)))+((monthlyDeposit*((Math.pow((1+interestRate/100/12),(12*year))-1)/(interestRate/100/12)))));
    }
    return calcedArr
}

const depositCalc = computed(()=>(deposit.value.toLocaleString(undefined,{ maximumFractionDigits: 0 })))


const noMonthly = computed (() => deposit.value)
const dataChart =  computed(() =>({
                labels: ['first year', '10 years', '20 years', '30 years', '40 years'],
                datasets: [
                    {
                        label: "what your investment will be worth",
                        backgroundColor: "#1E96FC",
                        borderColor: "#1E96FC",
                        data: [deposit.value, 
                              computed(() =>(compound (deposit.value, frequency.value)[years*0.25])).value, 
                              computed(() =>(compound (deposit.value, frequency.value))[years*0.5]).value, 
                              computed(() =>(compound (deposit.value, frequency.value))[years*0.75]).value, 
                              computed(() =>(compound (deposit.value, frequency.value))[years-1]).value
                              ],
                    },
                    {
                      // if its not monthly then this has to stay deposit.value 4
                        label: "what you invest",
                        backgroundColor: "#F7B538",
                        borderColor: "#F7B538",
                        fill: 1,
                        data: [deposit.value, 
                               deposit.value*10*12, 
                               deposit.value*20*12, 
                               deposit.value*30*12, 
                               deposit.value*40*12
                              ],
                    },
                ],
            }));


</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle='Deposit' />
    <div class="page">
      <div class="section">
        <div class="block">
          <div class="frame">
          <LineChart :chartData="dataChart"/>
          </div>
        </div>
        <div class="block">
          <form @submit.prevent="updateProfile">

            <label for="deposit" >
                <span v-if="frequency"> Monthly deposit </span>
                <span v-else> Single deposit </span>
            </label>
            <input id="deposit" type="number" v-model="deposit" min="500" max="1000000"/>

            <br/>
            <label class="switch">
                <input type="checkbox" id="monthly" v-model="frequency"  name="frequency" checked />
                <span class="slider round"></span>
            </label>
            <label for="monthly">
                Monthly</label>
            <br/>
            <br/>

            <nuxt-link to="/deposit/payment" >
              <input type="submit" value="deposit"/>
            </nuxt-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.frame div{
  width:100%;
}
</style>