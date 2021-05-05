<!-- Example to display pie chart by ECharts Vue.-->
<!-- ECharts Vue is booted by `boot/echarts`-->
<template>
  <q-page class="q-pa-md bg-grey-2 ">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8 text-weight-bolder">
          Pie Chart
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none echarts">
        <!--Tag `<v-chart>` is defined in `boot/echarts.ts` as `VUEECharts`.-->
        <v-chart class="chart" :option="option" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'EChartVuePage',
  watch: {
    '$q.dark.isActive' (value) {
      console.log(`[note] EChartVuePage >> Watch dark status: ${value ? 'dark' : 'light'} `)
    }
  }
})
export default class EChartVuePage extends Vue {
  option: Record<string, unknown> = {
    title: {
      text: 'Traffic Sources',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
    },
    series: [
      {
        name: 'Traffic Sources',
        type: 'pie',
        radius: '55%',
        center: ['50%', '40%'],
        data: [
          { value: 335, name: 'Direct' },
          { value: 310, name: 'Email' },
          { value: 234, name: 'Ad Networks' },
          { value: 135, name: 'Video Ads' },
          { value: 1548, name: 'Search Engines' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  mounted () {
    console.log('ECharts Vue page mounted >>')
    this.init()
  }

  init () {
    console.log('ECharts Vue page init >>')
  }
}
</script>

<style scoped>
.chart {
  height: 800px;
}
</style>
