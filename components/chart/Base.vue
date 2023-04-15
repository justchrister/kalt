<template>
  <div class="wrap">
    <div class="chart-sizer">
      <Line
        :options="chartOptions"
        :data="chartData"
      />
    </div>
    <div class="dates">
      <span>
        {{ labels[labels.length - props.days] }}
      </span>
      <span class="right">
        {{ labels[labels.length - 1]}}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
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
  aspectRatio: 1.77777777778,
  legend: {
    display: false
  },
  elements: {
    point:{
      radius: 2
    }
  },
  animation: { duration: 1 },
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
  tension: 0.1,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) label += ': ';
          if (context.parsed.y !== null) {
              label += new Intl.NumberFormat(
                'en-US', 
                { 
                  style: 'currency', 
                  currency: 'eur' 
              }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  }
}
const labels = ref([]);
const data = ref([]);
const chartData = computed(() => ({
  labels: labels.value.slice(-props.days),
  datasets: [
    {
      label: "",
      borderColor: '#202124',
      pointBackgroundColor: '#202124',
      pointBorderWidth: 0,
      pointBorderColor: '#202124',
      data: data.value.slice(-props.days)
    },
  ]
}))
const { data: rawData, error: rawDataError } = await supabase
  .from('get_user_portfolio')
  .select()
  .eq('user_id', user.value.id)

for (let i = 0; i < rawData.length; i++) {
  labels.value.push(rawData[i].date)
  data.value.push(rawData[i].value)
}
</script>
<style scoped lang="scss">

  .chart-sizer{
    height: 100%;
    width: 100%;
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
</style>