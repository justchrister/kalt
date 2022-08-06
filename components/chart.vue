<template>
    <div class="chart">
        <div class="chart-area">
        <line-chart
            style="height: 100%; width:100%;"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
        >
        </line-chart>
        </div>
    </div>
</template>

<script>
/*

    We need to add three filtration methods here; 
        1. 3 months view
        2. 12 month view
        3. MAX
    
    We also need to be able to pass it which users data we are going to fetch??
    
*/
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';

const depositColor = '#1E96FC';
const dividendColor = '#F991CC';

let data = [
  [100, 150, 155, 159, 175, 180, 210, 280, 305, 330, 390, 450],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
]

let labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

let depositsOptions = {
  fill: true,
  borderColor: depositColor,
  pointBackgroundColor: depositColor,
  pointHoverBackgroundColor: depositColor,
}

let dividendOptions = {
  borderColor: dividendColor,
  pointBackgroundColor: dividendColor,
  pointHoverBackgroundColor: dividendColor,
}

let chartData = {
    datasets: [{
    label: 'Dividends',
    ...dividendOptions,
    data: data[0]
    },
    {
    label: 'Deposits',
    ...depositsOptions,
    data: data[1]
    }],
    labels: labels
};

export default {
    name: 'Chart',
  components: {
    LineChart,
  }, 
  data () {
    return {
      bigLineChart: {
        activeIndex: 0,
        chartData: chartData,
        extraOptions: chartConfigs.purpleChartOptions,
        gradientStops: [1, 0.4, 0],
        categories: []
      }
    };
  },
  methods: {
    initBigChart (index) {
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted () {
    this.initBigChart(0);
  },
  // middleware: 'auth'
}
</script>
<style>
</style>