<template>
  <q-page class="">
    <div class="row q-col-gutter-sm q-ml-xs q-mr-sm q-py-sm">
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <line-chart></line-chart>-->
      <!--      </div>-->
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <bar-chart></bar-chart>-->
      <!--      </div>-->
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <pie-chart
          :cardHeight="cardHeight"
          :theme="theme"
          :options="pieChartOptions"
        ></pie-chart>
      </div>
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <scatter-chart></scatter-chart>-->
      <!--      </div>-->
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <dotted-bar-chart></dotted-bar-chart>-->
      <!--      </div>-->
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <guage-chart></guage-chart>-->
      <!--      </div>-->
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <boxplot></boxplot>-->
      <!--      </div>-->
      <!--      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">-->
      <!--        <area-chart></area-chart>-->
      <!--      </div>-->
    </div>
  </q-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PieChart from 'components/charts/PieChartComponent.vue'
import { ECharts } from 'boot/echarts'

// import LineChart from "components/LineChart";
// import BarChart from "components/BarChart";
// import ScatterChart from "components/ScatterChart";
// import DottedBarChart from "components/DottedBarChart";
// import GuageChart from "components/GuageChart";
// import Boxplot from "components/BoxChart";
// import AreaChart from "components/AreaChart";

@Options({
  name: 'EChartsPage',
  components: { PieChart }
})
export default class EChartsPage extends Vue {
  cardHeight = 300
  theme = 'light'
  pieChartOptions: ECharts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      top: 'bottom',
      bottom: '0%',
      left: 'center'
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Access source',
        type: 'pie',
        roseType: undefined,
        radius: [0, '70%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: 1048,
            name: 'Search Engine'
          },
          {
            value: 735,
            name: 'Direct access'
          },
          {
            value: 580,
            name: 'Email marketing'
          },
          {
            value: 484,
            name: 'Affiliate Advertising'
          },
          {
            value: 300,
            name: 'Video ad'
          }
        ]
      }
    ]
  }
}
</script>
