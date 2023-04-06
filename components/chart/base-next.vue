<template>
  <div class="chart-sizer">
    <Line
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>
<script lang="ts" setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const props = defineProps({
  currency: {
    type: String,
    required: true
  }
})
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
                  currency: props.currency 
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
  labels: labels.value,
  datasets: [
    {
      label: "",
      borderColor: '#202124',
      pointBackgroundColor: '#202124',
      pointBorderWidth: 0,
      pointBorderColor: '#202124',
      data: data.value
    },
  ]
}))
const { data: rawData, error: rawDataError } = await supabase
  .from('components_chart_portfolio')
  .select()
  .eq('user_id', user.value.id)

for (let i = 0; i < rawData.length; i++) {
  labels.value.push(rawData[i].date)
  data.value.push(rawData[i].converted_value)
}
ok.log('success', 'got the data:', props.data)
</script>
<style scoped lang="scss">

  .chart-sizer{
    height: 100%;
    width: 100%;
    max-height: 100%;
  }
</style>