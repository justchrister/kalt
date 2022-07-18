<template>
  <div class="PageWrapper userpage">
    <Kaltmenu pageTitle="Overview" />
    <div class='page'>
      <div class="section tabbed">
        <div class="frame">

      <BarChart :data="barChartData" :options="barChartOptions" :height="400" />
        </div>
        <div class="block">
          <div class="body">
            <h1>
              @Christer Bjørnstad
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kaltmenu from '../components/kaltmenu.vue';
import BarChart from '../components/BarChart.vue'
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
    components: { BarChart },
  data() {
    return {
      barChartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
        ],
        datasets: [
          {
            label: "Visualizaciones",
            data: [2, 1, 16, 3, 4, 5, 0, 0, 4, 12, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            borderColor: "rgba(100, 255, 0, 1)",
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Google analytics data",
          fontSize: 24,
          fontColor: "#6b7280",
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 7,
                min: 0,
                stepSize: 1,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    };
  },
}
</script>

<style scoped>
</style>


