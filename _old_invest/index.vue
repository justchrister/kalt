
<template>
  <div class="PageWrapper">
    <navbar :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="block">
          <h1> See how much you could make:</h1>
          <div class="frame">
          <LineChart :chartData="dataChartMonthly"/>
          </div>
        </div>
        <div class="block">
          <form @submit.prevent="updateCache">
            <dds-currency-amount />
            <label for="deposit" >
            <span v-if="reoccuring"> Monthly deposit </span>
            <span v-else> Single deposit </span>
            </label>
            <input id="deposit" type="number" v-model="amount"/>

            <br/>
            <label class="switch">
                <input type="checkbox" id="monthly" v-model="reoccuring" name="reoccuring" checked />
                <span class="slider round"></span>
            </label>
            <label for="monthly">
                Monthly</label>
            <br/>
            <br/>
          <input type="submit" value="next →">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pagename = 'Deposit';
const title = 'Kalt — ' + pagename;
const description = ref('My App Description')
const client = useSupabaseClient()
const user = useSupabaseUser()
const amount = ref(2000);

useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }]
})


// Computes the compound interest for a given principal amount and monthly deposit
// over a given number of years with a fixed interest rate of 8%
const compound = (principalAmount, monthlyDeposit, years) => {
  let calcedArr = [];
  // Interest rate per month (8 / 100 = 0.8 = 8% returns)
  const ratePerMonth = 8 / 100 / 12;
  for (let i = 0; i < years; i++) {
    // Calculate compound interest for each year
    let year = (i + 1);
    // Compound interest for the year
    let compoundInterest = principalAmount * Math.pow((1 + ratePerMonth), (12 * year))
    // Add monthly deposits for the year
    let total = compoundInterest + (monthlyDeposit * ((Math.pow((1 + ratePerMonth), (12 * year)) - 1) / ratePerMonth));
    calcedArr.push(total);
  }
  return calcedArr;
}
/*
This function calculates the compound interest for a given principal amount, monthly deposit, and number of years using the formula for compound interest: compoundInterest = principalAmount * (1 + rate/n)^(n*t)

where rate is the annual interest rate, n is the number of times the interest is compounded per year, and t is the number of years. In this case, the interest rate is 8% per year, and it is compounded monthly, so n is 12. The function then adds the total amount of monthly deposits for each year to the compound interest to get the total balance for that year.
*/
/*
// Computed property that returns chart data for monthly deposits
const dataChartMonthly = computed(() => ({
  labels: ['first year', '10 years', '20 years', '30 years', '40 years'],
  datasets: [
    {
      label: "what your investment will be worth",
      backgroundColor: "#1E96FC",
      borderColor: "#1E96FC",
      data: [
        amount.value,
        // Calculate compound interest for 10, 20, 30, and 40 years
        // using the compound function and the current deposit value
        compound(amount.value, amount.value, 10)[9],
        compound(amount.value, amount.value, 20)[19],
        compound(amount.value, amount.value, 30)[29],
        compound(amount.value, amount.value, 40)[39]
      ],
    },
    {
      // if its not monthly then this has to stay deposit.value 4
      label: "what you invest",
      backgroundColor: "#F7B538",
      borderColor: "#F7B538",
      fill: 1,
      data: [
        amount.value,
        // Calculate total investment for 10, 20, 30, and 40 years
        // by multiplying the current deposit value by the number of months
        amount.value * 10 * 12,
        amount.value * 20 * 12,
        amount.value * 30 * 12,
        amount.value * 40 * 12
      ],
    },
  ],
}));*/



const dataChartMonthly = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#1E96FC',
      borderColor: '#1E96FC',
      pointBackgroundColor: '#1E96FC',
      pointBorderWidth: 0,
      pointBorderColor: '#1E96FC',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}







console.log(dataChartMonthly.value)
</script>
<style scoped>

.frame div{
  width:100%;
}
</style>