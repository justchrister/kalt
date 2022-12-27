<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <tabs/>
        <div class="block">
            <div class="frame">
                <LineChart :chartData="dataChart"/>
            </div>
        </div>
        <div class="block">
            <div class="pills">
                <label for="seven">Last week</label>
                <input id="seven" type="radio" value="7" v-model="days" name="days"/>

                <label for="thirty">Last month</label>
                <input id="thirty" type="radio" value="30" v-model="days" name="days" />

                <label for="oneyear">Last year</label>
                <input id="oneyear" type="radio" value="365" v-model="days" name="days" />

                <label for="max">Total</label>
                <input id="max" type="radio" value="420420420" v-model="days" name="days" />
            </div>
        </div>
        <div class="block">
            <p v-if="portfolio"> You own {{portfolio[0].amount}} direct dividend shares</p>
            <p v-if="portfolio"> Your footprint has been decreased by {{portfolio[0].amount}} direct dividend shares</p>

        </div>
        <div class="block">
            <Cta />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
    const pagename = 'Portfolio';
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

    const client = useSupabaseClient()
    const user = useSupabaseUser()
    definePageMeta({
      middleware: ['auth']
    })

    onMounted(() => {
      watchEffect(() => {
        if (!user.value) {
          navigateTo('/sign-up-in')
        }
      })
    })

    const loading = ref(null)
    const days = ref(30)


    const { data: portfolio } = await useFetch('../api/bff/dailyCalculatedPortfolioValue',{
        query: { days: 365*5, user_id: user.value.id },
        server: false
    })
    const getData = (dataset) => {
        if (dataset) {
            var dataArray = [];
            for (let i = 0; i < dataset.length; i++) {
                var row = dataset[i];
                dataArray.push(row.amount * 100);
            }
            return dataArray;
        }
        return [];
    };
    const getLabels = (dataset) => {
    if (dataset) {
        var dataArray = [];
        for (let i = 0; i < dataset.length; i++) {
            var row = dataset[i];
            dataArray.push(row.date);
        }
        //const tenthValues = dataArray.filter((number, index) => index % 30 === 0); to get every 30th day from the array
        // could be used in combination with const monthNumber = date.getMonth(row.date); you can improve the chart drastrically
        return dataArray;
    }
    return [];
    };
    // Data
    const dataChart = computed(() => {
    if (portfolio) {
        return {
        labels: getLabels(portfolio.value).slice(0, days.value).reverse(),
        datasets: [
            {
            label: "DDS",
            backgroundColor: "#1E96FC",
            borderColor: "#1E96FC",
            data: getData(portfolio.value).slice(0, days.value).reverse(),
            },
        ],
        };
    }
    return {};
    });

</script>