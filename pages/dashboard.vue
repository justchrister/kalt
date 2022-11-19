<script setup lang="ts">

    definePageMeta({
        middleware: ['auth']
    })

    const client = useSupabaseClient()
    const user = useSupabaseUser()
    const loading = ref(null)
    onMounted(() => {
        watchEffect(() => {
            if (!user.value) {
            navigateTo('/authenticate')
            }
        })
    })

    const days = ref(90);
    const { data: portfoliovalues } = await useAsyncData('portfoliovalue', async () => {
        const { data } = await client.from('portfoliovalue').select('*').order('date').eq('user_id', user.value.id)
        return data
    })

    const getData = (values, days) => {
        var dataArray = [];
        for (let i = 0; i < values.value.length; i++) {
            var row = values.value[i]
            dataArray.push(row.value);
        }
        return dataArray.slice(-days);
    }

    const getLabels = (values, days) => {
        var dataArray = [];
        for (let i = 0; i < values.value.length; i++) {
            var row = values.value[i]
            dataArray.push(row.date);

        }
        
        return dataArray.slice(-days);
    }

    // Data

    const dataChart = 
        computed(() =>({
            labels: getLabels(portfoliovalues, days.value),
            datasets: [
                {
                    label: "what your investment will be worth",
                    backgroundColor: "#1E96FC",
                    borderColor: "#1E96FC",
                    data: getData(portfoliovalues, days.value),
                },
            ],
        })
    );

console.log(days.value)
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Dashboard" />
    <div class="page">
      <div class="section">
        <kaltheader/>
        <div class="block">
            <div class="frame">
                <LineChart :chartData="dataChart"/>
            </div>
        </div>
        <div class="block">
            <div class="pills">
                <label for="seven">One week</label>
                <input id="seven" type="radio" value="7" v-model="days" />

                <label for="thirty">One month</label>
                <input id="thirty" type="radio" value="30" v-model="days" />

                <label for="oneyear">One year</label>
                <input id="oneyear" type="radio" value="365" v-model="days" />

                <label for="max">max</label>
                <input id="max" type="radio" value="420420420" v-model="days" />
            </div>
        </div>
        <div class="block">
            <Cta />
        </div>
      </div>
    </div>
  </div>
</template>