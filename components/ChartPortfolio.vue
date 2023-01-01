<template>
  <div class="chartWrap">
    <Line
      :options="chartOptions"
      :data="chartData"
    />
    <nav class="pills filters">
      <button>
        24 hours
      </button>
      <button>
        7 days
      </button>
      <button>
        30 days
      </button>
      <button>
        6 months
      </button>
      <button>
        1 year
      </button>
      <button>
        max
      </button>
    </nav>
    <nav class="pills CTA">
      <nuxt-link to="account/sell">
        <button style="background-color:#F4442E;">
          SELL
        </button>
      </nuxt-link>
      <nuxt-link to="account/buy">
        <button style="background-color:#0CF574;">
          BUY
        </button>
      </nuxt-link>
    </nav>
  </div>
</template>
<style scoped>
nav.pills{
  display:inline-block;
}
nav.pills.filters{
  width:80%;}
nav.pills.CTA{
  width:20%;
  text-align:right;
}
nav.pills.CTA button{
  width:40%;
  text-align:center;
}
</style>
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
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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


</script>