<template>
  <div class="wrap">
    <div class="chart-sizer">
      <Line
        :options="chartOptions"
        :data="chartData"
      />
    </div>
    <span class="value">
      <span v-if="hoveredValue">
        {{ hoveredValue }}
      </span>
      <span v-else>
        {{ new Intl.NumberFormat(
                'en-US', 
                { 
                  style: 'currency', 
                  currency: userData.currency
              }).format(datas[datas.length - props.days])
        }}
      </span>
    </span>
    <div class="dates">
      <span v-if="labels[labels.length - props.days]">
        {{labels[labels.length - props.days] }}
      </span>
      <span v-else>
        {{ labels[0] }}
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
  aspectRatio: 1.77777777778,
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
      bodyFont:{
        family: 'Kalt Body',
      },
      footerFont:{
        family: 'Kalt Body',
      },
      displayColors:false,
      cornerRadius:0,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          //if (label) label += ': ';
          if (context.parsed.y !== null) {
              label += new Intl.NumberFormat(
                'en-US', 
                { 
                  style: 'currency', 
                  currency: userData.currency
              }).format(context.parsed.y);
          }
          updateHoveredValue(label)
          return label;
        }
      }
    }
  }
}
const labels = ref([]);
const datas = ref([]);
const chartData = computed(() => ({
  labels: labels.value.slice(-props.days),
  datasets: [
    {
      label: "",
      borderColor: '#202124',
      pointBackgroundColor: '#202124',
      pointBorderWidth: 0,
      pointBorderColor: '#202124',
      data: datas.value.slice(-props.days)
    },
  ]
}))
const { data, error } = await supabase
  .from('get_user_portfolio')
  .select()
  .eq('user_id', user.value.id)
const { data:userData, error:userError } = await supabase
  .from('get_user')
  .select()
  .eq('user_id', user.value.id)
  .limit(1)
  .single()

for (let i = 0; i < data.length; i++) {
  labels.value.push(data[i].date)
  datas.value.push(data[i].value)
}
const hoveredValue = ref('');
const updateHoveredValue = async (x) => {
  hoveredValue.value = x;
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
</style>