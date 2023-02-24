<template>
  <div class="chartWrap">
    <Line
      :options="chartOptions"
      :data="chartData"
    />
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
  data: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  elements: {
    point:{
      radius: 2
    }
  },
  animation: {
    duration: 1
  },
  interaction: {
    intersect: 0
  },
  scales: {
    y: {
      beginAtZero: true
    },
    x:{
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        minRotation: 0
      }
    }
  },
  tension: 0.2,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) label += ': ';
          if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: props.currency }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  }
}
const labels = ref();
const data = ref();
const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: props.label,
      backgroundColor: '#1E96FC',
      borderColor: '#1E96FC',
      pointBackgroundColor: '#1E96FC',
      pointBorderWidth: 0,
      pointBorderColor: '#1E96FC',
      data: data.value
    },
  ]
}))

const updateChart = async (dataset) => {
  let temp_labels = []
  let temp_data = []
  for (let i = 0; i < props.data.length; i++) {
    temp_labels.push(props.data[i].date)
    temp_data.push(props.data[i].quantity)
  }
  labels.value= temp_labels
  data.value= temp_data
}
watch(() => props.data, () => 
    updateChart(props.data)
, { deep: true })

</script>