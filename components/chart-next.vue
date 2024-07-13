<template>
  <div class="container">
    <div class="pills-container">
      <div class="numbers">
        <pill-next>
            {{ hoveredValue }}
          <span class="percentage">
            ({{ percentageChange }} %)
          </span>
        </pill-next>
      </div>
      <div class="filters">
        <pill-next @click="setDays('thisMonth')" :active="active === 'thisMonth'" :clickable="true" color="blue">
          this month
        </pill-next>
        <pill-next @click="setDays('threeMonths')" :active="active === 'threeMonths'" :clickable="true" color="blue">
          3 months
        </pill-next>
        <pill-next @click="setDays('thisYear')" :active="active === 'thisYear'" :clickable="true" color="blue">
          this year
        </pill-next>
        <pill-next @click="setDays('fromStart')" :active="active === 'fromStart'" :clickable="true" color="blue">
          from start
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

  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 2
    }
  },
  animation: { duration: 1000 },
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
      backgroundColor: '#bedefb',
      bodyFont: { 
        family: 'Kalt Body',
        color: '#161719' // Ensure this is set correctly
      },
      footerFont: { 
        family: 'Kalt Body',
        color: '#161719' // Ensure this is set correctly
      },
      displayColors: false,
      cornerRadius: 0,
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

const color = '#161719';
const labels = ref([]);
const data = ref([]);
const hoveredValue = ref(null);
const percentageChange = ref(null);

const randomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);

const fetchPortfolio = async () => {
  const portfolio = await get(supabase).portfolio(user);
  portfolio.forEach(item => {
    data.value.push(item.value * randomNumber(1, 1));
    labels.value.push(item.date);
  });
  updatePercentageChange(data.value[data.value.length - 1]);
  updateHoveredValue(new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(data.value[data.value.length - 1]));
};

const chartData = computed(() => ({
  labels: labels.value.slice(-days.value),
  datasets: [{
    label: "",
    borderColor: color,
    pointBackgroundColor: color,
    pointBorderWidth: 0,
    pointBorderColor: color,
    data: data.value.slice(-days.value)
  }]
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

const calculateProjection = (x) => {
  const magicNumber = 1.006043959;
  const lastValue = data.value[data.value.length - 1];
  const rawPercentageChange = ((lastValue - x) / x) * 100;
  // Use rawPercentageChange if needed for further calculations
};

const daysSoFarThisYear = () => {
    return Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  }
  const daysSoFarThisMonth = () => {
    return Math.floor((new Date() - new Date(new Date().getFullYear(), new Date().getMonth(), 0)) / 1000 / 60 / 60 / 24);
  }
  const active = ref('thisMonth');
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
  setDays('thisMonth')
  fetchPortfolio(); // This will run the fetching in the background
</script>
<style scoped lang="scss">
  .container{
    width:100%;
    height: 100%;
  }
  .chart-sizer{
    height: 100%;
    max-height: 100%;
  }
  .chart-container{
    width: 100%;
    height: 45vw;
    max-height: 365px;
    background-image: radial-gradient(circle at 1px 1px, primary(30%) 1px, transparent 0);
    background-size: sizer(1.3) sizer(1.3);
    @include hoverable;
    border-radius: sizer(0.8);
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
