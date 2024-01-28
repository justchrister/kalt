<template>
  <div class="wrap">
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
<script setup lang="ts">
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
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const currency = user.currency || 'EUR';

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
  let color = '#161719';
  const labels = ref([]);
  const data = ref([]);
  const fetchPortfolio = async () => {
    const portfolio = await get(supabase).portfolio(user);
    for (let i = 0; i < portfolio.length; i++) {
      data.value.push(portfolio[i].value);
      labels.value.push(portfolio[i].date);
    }
    updatePercentageChange(data.value[data.value.length - 1])
    hoveredValue.value = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency}).format(
      data.value[data.value.length - 1]
    )
  };

  fetchPortfolio(); // This will run the fetching in the background


  const chartData = computed(() => ({
    labels: labels.value.slice(-props.days),
    datasets: [{
        label: "",
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderWidth: 0,
        pointBorderColor: color,
        data: data.value.slice(-props.days)
      }]
  }))

  const hoveredValue = ref(
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency}).format(
      data.value[data.value.length - 1]
    )
  );
  const updateHoveredValue = (x) => {
    hoveredValue.value = x;
  };

  const percentageChange = ref(
    data.value[data.value.length - 1]
  );

  const updatePercentageChange = (x: any) => {
    const firstValue = data.value[data.value.length - props.days] || data.value[0];
    const lastValue = x;
    const rawPercentageChange = ((lastValue - firstValue) / firstValue) * 100;

    if (rawPercentageChange === Infinity) return percentageChange.value = 99.9;
    if (isNaN(rawPercentageChange)) return percentageChange.value = 0;

    percentageChange.value = parseFloat(rawPercentageChange.toFixed(1));
    percentageChange.value = Math.floor(rawPercentageChange * 10) / 10;
  };
  const calculateProjection = (x: any) => {
    const magicNumber = 1.006043959;
    const lastValue = data.value[data.value.length - 1];
    const rawPercentageChange = ((lastValue - x) / x) * 100;
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
    background-image: radial-gradient(circle at 1px 1px, primary(30%) 1px, transparent 0);
    background-size: sizer(1.3) sizer(1.3);
    @include hoverable;
    border-radius: sizer(0.8);
    margin-bottom: sizer(1);
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