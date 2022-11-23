<script setup lang="ts">
const pagename = 'Deposit';
const title = 'Kalt — ' + pagename;
const description = ref('My App Description')

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

const client = useSupabaseClient()
const user = useSupabaseUser()

const frequency = ref(true);

const years = 40;
const deposit = ref(2000);


onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate/sign-up')
    }
  })
})


// should probably find a way to push the value into the array automatically but this will do for now
const compounding = (principalAmount, monthlyDeposit) => {
    let calcedArr = [];
    let interestRate = 8;
    for (let i = 0; i < years; i++) {
      // Runs 5 times, with values of step 0 through 4.
      let year = (i+1);
      calcedArr.push((principalAmount*Math.pow((1+(interestRate/100/12)),(12*year)))+((monthlyDeposit*((Math.pow((1+interestRate/100/12),(12*year))-1)/(interestRate/100/12)))));
    }
    return calcedArr
}

// this code is extremely redundant

const dataChartMonthly = computed(() =>({
                labels: ['first year', '10 years', '20 years', '30 years', '40 years'],
                datasets: [
                    {
                        label: "what your XXX will be worth",
                        backgroundColor: "#1E96FC",
                        borderColor: "#1E96FC",
                        data: [deposit.value, 
                              computed(() =>(compounding (deposit.value, deposit.value)[years*0.25])).value, 
                              computed(() =>(compounding (deposit.value, deposit.value))[years*0.5]).value, 
                              computed(() =>(compounding (deposit.value, deposit.value))[years*0.75]).value, 
                              computed(() =>(compounding (deposit.value, deposit.value))[years-1]).value
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

const dataChartOnce = computed(() =>({
                labels: ['first year', '10 years', '20 years', '30 years', '40 years'],
                datasets: [
                    {
                        label: "what your investment will be worth",
                        backgroundColor: "#1E96FC",
                        borderColor: "#1E96FC",
                        data: [deposit.value,
                              computed(() =>(compounding (deposit.value, 0)[years*0.25])).value, 
                              computed(() =>(compounding (deposit.value, 0))[years*0.5]).value, 
                              computed(() =>(compounding (deposit.value, 0))[years*0.75]).value, 
                              computed(() =>(compounding (deposit.value, 0))[years-1]).value
                              ],
                    },
                    {
                      // if its not monthly then this has to stay deposit.value 4
                        label: "what you invest",
                        backgroundColor: "#F7B538",
                        borderColor: "#F7B538",
                        fill: 1,
                        data: [deposit.value, 
                               deposit.value, 
                               deposit.value, 
                               deposit.value, 
                               deposit.value
                              ],
                    },
                ],
            }));


console.log(deposit.value)
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="block">
          <h1> See how much you could make:</h1>
          <div class="frame">
          <LineChart :chartData="dataChartMonthly" v-if="frequency"/>
          <LineChart :chartData="dataChartOnce" v-else/>
          </div>
        </div>
        <div class="block">
          <form action="https://payment.v1.kalt.co/once" method="POST">

            <input type="hidden" name="lookup_key" value="DDF_Global_Monthly" />
            <input type="hidden" name="user_id" value="{{user.value.id}}" />


            <label for="deposit" >
            <span v-if="frequency"> Monthly deposit </span>
            <span v-else> Single deposit </span>
            </label>
            <input id="deposit" type="number" v-model="deposit"/>

            <br/>
            <label class="switch">
                <input type="checkbox" id="monthly" v-model="frequency"  name="frequency" checked />
                <span class="slider round"></span>
            </label>
            <label for="monthly">
                Monthly</label>
            <br/>
            <br/>

            <input type="submit" value="→" />
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