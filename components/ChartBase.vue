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
    type: Array<Number>,
    required: true
  },
  data2: {
    type: Array<Number>,
    required: false
  },
  labels: {
    type: Array<String>,
    required: true
  },
  label:{
    type: String,
    required: true
  },
  label2:{
    type: String,
    required: false
  }
})
const chartOptions = {
  responsive: true,
  elements: {
    point:{
      radius: 0.1
    }
  },
  animation: {
      duration: 0
  },
  interaction: {
      intersect: 0
  },
  maintainAspectRatio: true,
  tension: 0.5,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) label += ': ';
          if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NOK' }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  }
}
const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: '',
      backgroundColor: '#1E96FC',
      borderColor: '#1E96FC',
      pointBackgroundColor: '#1E96FC',
      pointBorderWidth: 0,
      pointBorderColor: '#1E96FC',
      data: []
    },
  ]
})
chartData.labels = props.labels;
chartData.datasets[0].label = props.label;
chartData.datasets[0].data = props.data;


// if we have two lines

const chartData2 = reactive({
  datasets:
    {
      label: '',
      backgroundColor: '#F7B538',
      borderColor: '#F7B538',
      pointBackgroundColor: '#F7B538',
      pointBorderWidth: 0,
      pointBorderColor: '#F7B538',
      data: []
    }
})

if(props.data2){
  chartData2.datasets.label = props.label2;
  chartData2.datasets.data = props.data2;
  chartData.datasets.push(chartData2.datasets)
}
console.log(chartData)
</script>