
<template>
        <div>
          <card type="chart">
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
        </card>
        <nav class="legend">
          <ul>
            <li id="deposit">
              Deposits
            </li>
            <li id="dividends">
              Dividends
            </li>
          </ul>
        </nav>
        </div>
</template>
<script>

import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';

let bigChartData = [
  [100, 150, 155, 159, 175, 180, 210, 280, 305, 330, 390, 450],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
]
let bigChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

export default {
name: 'Historychart',
  components: {
    LineChart,
  }, 
  data () {
    return {
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            label: 'Dataset 1',
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          },
          {
            label: 'Dataset 2',
            data: bigChartData[1]
          },
          {
            label: 'Dataset 3',
            data: bigChartData[2]
          }
          ],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientStops: [1, 0.4, 0],
        categories: []
      }
    };
  },
  methods: {
    initBigChart (index) {
      let chartData = {
          datasets: [{
            label: 'Dataset 1',
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          },
          {
            label: 'Dataset 2',
            data: bigChartData[1]
          },
          {
            label: 'Dataset 3',
            data: bigChartData[2]
          }
          ],
          labels: bigChartLabels
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted () {
    this.initBigChart(0);
  }
}
</script>
