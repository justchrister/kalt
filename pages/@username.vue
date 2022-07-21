<template>
  <div class="PageWrapper userpage">
    <Kaltmenu pageTitle="Overview" />
    <div class='page'>
      <div class="section">
        <div class="frame card-chart chart">
            
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h5 class="card-category">Total shipments</h5>
              <h2 class="card-title">Performance</h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle"
                data-toggle="buttons"
              >
                <label
                  v-for="(option, index) in bigLineChartCategories"
                  :key="option.name"
                  class="btn btn-sm btn-primary btn-simple"
                  :class="{ active: bigLineChart.activeIndex === index }"
                  :id="index"
                >
                  <input
                    type="radio"
                    @click="initBigChart(index)"
                    name="options"
                    autocomplete="off"
                    :checked="bigLineChart.activeIndex === index"
                  />
                  <span class="d-none d-sm-block">{{ option.name }}</span>
                  <span class="d-block d-sm-none">
                    <i :class="option.icon"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
        </div>
        <nav class="legend">
          <ul>
            <li>
              Deposits
            </li>
            <li>
              Dividends
            </li>
          </ul>
        </nav>
        <div class="block">
          <h1>
            @Christer Bjørnstad
          </h1>
        </div>
        <div class="block">
          <p> <strong> Transactions </strong> </p>
          <table>
            <tr>
              <th>Amount</th>
              <th>Account</th>
              <th>Date</th>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>+ 103.44 €</td>
              <td>Account name</td>
              <td>13.02.22</td>
            </tr>
            <tr>
              <td>+ 34.44 €</td>
              <td>Account name</td>
              <td>14.02.22</td>
            </tr>
            <tr>
              <td>See all transactions</td>
            </tr>
        </table>
      </div>
      <div class="block" style="text-align: center;">
        <button> Invest more </button>
        <a href="withdraw"> Withdraw </a>
        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Kaltmenu from '../components/kaltmenu.vue';
import LineChart from '@/components/Charts/LineChart';
import config from '@/config';
import * as chartConfigs from '@/components/Charts/config';

let bigChartData = [
  [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
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
  head() {
    return{
      title: 'Kalt — Overview',
      meta: [{
          hid: 'description',
          name: 'description',
          content: 'Best app ever'
      }]
    }
  },
  components: {
    LineChart,
    Kaltmenu,
  }, 
  data () {
    return {
      tableData: [
        {
          id: 1,
          name: 'Dakota Rice',
          salary: '$36.738',
          country: 'Niger',
          city: 'Oud-Turnhout'
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          salary: '$23,789',
          country: 'Curaçao',
          city: 'Sinaai-Waas'
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          salary: '$56,142',
          country: 'Netherlands',
          city: 'Baileux'
        },
        {
          id: 4,
          name: 'Philip Chaney',
          salary: '$38,735',
          country: 'Korea, South',
          city: 'Overland Park'
        },
        {
          id: 5,
          name: 'Doris Greene',
          salary: '$63,542',
          country: 'Malawi',
          city: 'Feldkirchen in Kärnten'
        }
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      }
    };
  },
  computed: {
    bigLineChartCategories () {
      return [{ name: 'Accounts', icon: 'tim-icons icon-single-02' }, {
        name: 'Purchases',
        icon: 'tim-icons icon-gift-2'
      }, { name: 'Sessions', icon: 'tim-icons icon-tap-02' }];
    }
  },
  methods: {
    initBigChart (index) {
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data: bigChartData[index]
        }],
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

<style scoped>
</style>


