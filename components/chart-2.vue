<template>
  <span class="value">
      {{ hoveredValue }}
    <span class="percentage">
      ({{ percentageChange }} %)
    </span>
  </span>
  <div class="wrap">
    <div class="chart-sizer">
      <Line
        :options="chartOptions"
        :data="chartData"
      />
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
      backgroundColor: '#000',
      bodyFont: { family: 'Kalt Body' },
      footerFont: { family: 'Kalt Body' },
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
  labels: labels.value.slice(-props.days),
  datasets: [{
    label: "",
    borderColor: color,
    pointBackgroundColor: color,
    pointBorderWidth: 0,
    pointBorderColor: color,
    data: data.value.slice(-props.days)
  }]
}));

const updateHoveredValue = (value) => {
  hoveredValue.value = value;
};

const updatePercentageChange = (lastValue) => {
  const firstValue = data.value[data.value.length - props.days] || data.value[0];
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

fetchPortfolio(); // This will run the fetching in the background
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
  .right{
    text-align:right;
  }
  .value{
    display: inline-block;
    background-color: green(100%);
    border-radius:sizer(2);
    padding:0 sizer(1);
    font-size: 80%;
    line-height:sizer(2);
  }
  .percentage{
    font-size:sizer(1);
    line-height:sizer(2);
  }
</style>