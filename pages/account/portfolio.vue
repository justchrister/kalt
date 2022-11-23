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
    <Kaltmenu :pageTitle="pagename" />
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
                <label for="seven">Last week</label>
                <input id="seven" type="radio" value="7" v-model="days" />

                <label for="thirty">Last month</label>
                <input id="thirty" type="radio" value="30" v-model="days" />

                <label for="oneyear">Last year</label>
                <input id="oneyear" type="radio" value="365" v-model="days" />

                <label for="max">Total</label>
                <input id="max" type="radio" value="420420420" v-model="days" />
            </div>
        </div>
        <div class="block">
            <p> So far you've deposited 128398348</p>
            <p> So far you've earned 128398348</p>
            <p> Which makes your portfolio worth 128398348</p>
            <p> This equates to 7 trips in a private jet around the world</p>
            <p> This equates to eating 19475 avocadoes</p>

        </div>
        <div class="block">
            <Cta />
        </div>
      </div>
    </div>
  </div>
</template>