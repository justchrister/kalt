<template>
  <div class="wrap" v-if="data">
    <div class="chart-sizer">
      <Line
        :options="chartOptions"
        :data="chartData"
      />
    </div>
    <span class="value">
        {{ hoveredValue }}
      <span class="percentage">
        ({{ percentageChange }} %)
      </span>
    </span>
    <div class="dates">
      <span>
        {{ labels[labels.length - props.days] || labels[0] }}
      </span>
      <span class="right">
        {{ labels[labels.length - 1]}}
      </span>
    </div>
  </div>
</template>
<script setup>
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  const props = defineProps({
      days: {
        type: Number,
        required: true
      }
    })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.7,
    legend: {
      display: false
    },
    elements: {
      point:{
        radius: 2
      }
    },
    animation: { duration: 1000 },
    interaction: {
      intersect: 0
    },
    scales: {
      y: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          autoSkip: true,
          display: false
        }
      },
      x:{
        grid: {
          border: false,
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          autoSkip: true,
          display: false
        }
      }
    },
    tension: 0,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000',
        bodyFont:{ family: 'Kalt Body'},
        footerFont:{ family: 'Kalt Body'},
        displayColors:false,
        cornerRadius:0,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
                label += new Intl.NumberFormat(
                  'en-US', 
                  { 
                    style: 'currency', 
                    currency: currency 
                }).format(context.parsed.y);
            }
            updatePercentageChange(context.parsed.y)
            updateHoveredValue(label)
            return label;
          }
        }
      }
    }
  }
  const labels = ref([]);
  const datas = ref([]);
  let color = '#202124';

  const colorMode = useColorMode()
  if(colorMode.value=='dark') {
    color = '#FCF9F2'
  }
  const chartData = computed(() => ({
    labels: labels.value.slice(-props.days),
    datasets: [{
        label: "",
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderWidth: 0,
        pointBorderColor: color,
        data: datas.value.slice(-props.days)
      }]
  }))
  const { data, error } = await supabase
    .from('getUserPortfolio')
    .select()
    .eq('userId', user.value.id)
    .order('date', { ascending: true })
  if(error) ok.log('error', 'could not getUserPortfolio: ', error)

  const getUser = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select()
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(error) {
      ok.log('error', 'could not getUser: '+error.message)
      return error
    } else{
      return data
    }
  }
  const userObject = await getUser()
  const currency = userObject.currency || 'EUR';

  for (let i = 0; i < data.length; i++) {
    labels.value.push(data[i].date)
    datas.value.push(data[i].value)
  }
  const hoveredValue = ref(new Intl.NumberFormat('en-US', { style: 'currency', currency: currency}).format(datas.value[datas.value.length - props.days]));

  const updateHoveredValue = (x) => {
    hoveredValue.value = x;
  }
  const percentageChange = ref(
    datas.value[datas.value.length - 1]
  )
  const updatePercentageChange = (x) => {
    const firstValue = datas.value[datas.value.length - props.days] || datas.value[0];
    const lastValue = x;
    const rawPercentageChange = ((lastValue - firstValue) / firstValue) * 100;
    percentageChange.value = parseFloat(rawPercentageChange.toFixed(1));
    percentageChange.value = Math.floor(rawPercentageChange * 10) / 10;
  }
</script>
<style scoped lang="scss">

  .chart-sizer{
    height: 100%;
    max-height: 100%;
  }
  .wrap{
    height: 100%;
    width: 100%;
    max-height: 100%;
  }
  .dates{
    font-size:80%;
    display:grid;
    grid-template-columns: 1fr 1fr;
  }
  .right{
    text-align:right;
  }
  .percentage{
    font-size:80%;
  }
</style>