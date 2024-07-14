<template>
  <div class="container">
    <div class="pills-container">
      <div class="numbers">
        <pill-next size="small">
            {{ hoveredValue }}
          <span class="percentage">
            <span v-if="isPositive(percentageChage)">↗</span>
            ({{ percentageChange }} %)
          </span>
        </pill-next>
      </div>
      <div class="filters">
        <pill-next @click="setDays('fromStart')" :active="active === 'fromStart'" :clickable="true" color="blue" size="small">
          from start
        </pill-next>
        <pill-next @click="setDays('thisYear')" :active="active === 'thisYear'" :clickable="true" color="blue" size="small">
          this year
        </pill-next>
        <pill-next @click="setDays('threeMonths')" :active="active === 'threeMonths'" :clickable="true" color="blue" size="small">
          3 months
        </pill-next>
        <pill-next @click="setDays('thisMonth')" :active="active === 'thisMonth'" :clickable="true" color="blue" size="small">
          this month
        </pill-next>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-sizer">
        <Line
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

  const runtimeConfig = useRuntimeConfig()
  const demo = runtimeConfig.public.DEMO as boolean;

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
  } from 'chart.js'
  import { Line } from 'vue-chartjs'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  )

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const currency = user.currency || 'EUR';


  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        hoverRadius:3
      }
    },
    animation: { duration: 300 },
    interaction: {
      intersect: 0
    },
    scales: {
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { autoSkip: true, display: false }
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { autoSkip: true, display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        // https://www.chartjs.org/docs/latest/configuration/tooltip.html
        backgroundColor: '#97ead0',
        titleColor: '#161719',
        bodyColor: '#161719',
        titleFont: { family: 'Kalt Body', weight: '400' },
        bodyFont: { family: 'Kalt Body', weight: '400' },
        footerFont: { family: 'Kalt Body' },
        displayColors: false,
        padding: 10 ,
        cornerRadius: 2,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat(
                'en-US',
                {
                  style: 'currency',
                  currency: currency
                }
              ).format(context.parsed.y);
            }
            updatePercentageChange(context.parsed.y)
            updateHoveredValue(label)
            return label;
          }
        }
      }
    }
  }

  const color = '#5fb0fc';
  const labels = ref([]);
  const data = ref([]);
  const hoveredValue = ref(null);
  const percentageChange = ref(null);
  const isPositive = (number:number) => {

    if (number > 0.000001) {
      return true;
    } else {
      return false;
    }
  }

  // Helper function to get the day suffix
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = getDaySuffix(day);

    return `${month} ${day}${daySuffix}, ${year}`;
  }
  const trimLeadingZeros = (portfolio: { date: string, value: number }[]): { date: string, value: number }[] => {
    while (portfolio.length > 1 && portfolio[0].value === 0) {
      portfolio.shift();
    }
    return portfolio;
  };

  const randomNumber = (from, to) => Math.random() * (to - from) + from;
  const dailyIncrease = (annualRate) => Math.pow(1 + annualRate, 1 / 365) - 1;

  const fetchPortfolio = async () => {
  const annualRateMin = 0.015;
  const annualRateMax = 0.25;
  const dailyRateMin = dailyIncrease(annualRateMin);
  const dailyRateMax = dailyIncrease(annualRateMax);

  const portfolio = await get(supabase).portfolio(user);
  const trimmed = trimLeadingZeros(portfolio);

  trimmed.forEach((item, index) => {
    const randomIncrease = randomNumber(dailyRateMin, dailyRateMax);
    if (demo) {
      const previousValue = data.value[index - 1] || item.value;
      const newValue = previousValue * (1 + randomNumber(0, randomIncrease));
      data.value.push(newValue);
    } else {
      data.value.push(item.value);
    }
    labels.value.push(formatDate(item.date));
  });

  updatePercentageChange(data.value[data.value.length - 1]);
  updateHoveredValue(new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(data.value[data.value.length - 1]));
};

  const chartData = computed(() => ({
    labels: labels.value.slice(-days.value),
    datasets: [
      {
        label: "",
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderWidth: 0,
        pointBorderColor: color,
        data: data.value.slice(-days.value)
      }
    ]
  }));

  const updateHoveredValue = (value) => {
    hoveredValue.value = value;
  };

  const days = ref(30)
  const updatePercentageChange = (lastValue) => {
    const firstValue = data.value[data.value.length - days.value] || data.value[0];
    const rawPercentageChange = ((lastValue - firstValue) / firstValue) * 100;

    if (rawPercentageChange === Infinity) {
      percentageChange.value = 99.9;
    } else if (isNaN(rawPercentageChange)) {
      percentageChange.value = 0;
    } else {
      percentageChange.value = parseFloat(rawPercentageChange.toFixed(1));
    }
  };

  const daysSoFarThisYear = () => {
    return Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  };

  const daysSoFarThisMonth = () => {
    return Math.floor((new Date() - new Date(new Date().getFullYear(), new Date().getMonth(), 0)) / 1000 / 60 / 60 / 24);
  };

  const active = ref('fromStart');

  const setDays = (range) => {
    active.value = range;
    if (range === 'thisMonth') {
      days.value = daysSoFarThisMonth();
    } else if(range==='threeMonths'){
      days.value = 91
    } else if(range==='thisYear'){
      days.value = daysSoFarThisYear();
    } else if(range==='fromStart'){
      days.value = 99999999999
    } 
  }
  setDays('fromStart')
  fetchPortfolio();
</script>
<style scoped lang="scss">
  .container{
    width:100%;
    height: 100%;
  }
  .chart-sizer{
    height: 100%;
    max-height: 100%;
    background: #fff;
    border-radius: sizer(0.2);
    border: dark(30%) solid 1px;
    @include drop-shadow;
  }
  .chart-container{
    width: 100%;
    height: 45vw;
    max-height: 365px;
    @include hoverable;
  }
  .pills-container{
    display:grid;
    grid-template-columns: sizer(12) 1fr;
    gap: sizer(1);
    margin-bottom:sizer(1);
  }
  .numbers{
    .percentage{
      font-size:sizer(1);
      line-height:sizer(2);
    }
  }
  .filters {
    grid-column: 2; // Place filters in the second column
    justify-self: end; // Align filters to the right within the column
    *{
      margin-left:sizer(0.5);
    }
  }
</style>
