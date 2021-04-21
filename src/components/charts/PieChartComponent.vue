<!-- Example of Echarts v5 -->
<template>
  <div>
    <q-card>
      <q-card-section class="text-h6">
        Pie Chart
      </q-card-section>
      <q-card-section>
        <div ref="piechart" id="pieChart" :style="cssVars"></div>
      </q-card-section>
      <q-resize-observer @resize="onResize"/>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Meta } from '../models'
import { ECharts } from 'boot/echarts'

class Props {
  readonly cardHeight = prop<number>({ default: 250 })
  readonly theme!: string | undefined;
  readonly options = prop<ECharts.EChartsOption>({
    default: {
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
          radius: [0, '75%'],
          center: ['50%', '25%'],
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
            { value: 0, name: 'No data' }
          // { value: 1048, name: 'Search Engine' },
          // { value: 735, name: 'Direct access' },
          // { value: 580, name: 'Email marketing' },
          // { value: 484, name: 'Affiliate Advertising' },
          // { value: 300, name: 'Video ad' }
          ]
        }
      ]

    }
  });

  readonly meta!: Meta;
  readonly active!: boolean;
}

export default class PieChartComponent extends Vue.with(Props) {
  name = 'PieChartComponent'
  theme: string | undefined = 'light'
  options: ECharts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      top: 'bottom',
      bottom: '5%',
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
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
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
          { value: 100, name: 'No Data' }
        ]
      }
    ]
  }

  pieChart: any = null

  mounted () {
    console.log('Echarts v5 pie charts component mounted >>')
    this.init()
  }

  init () {
    const pieChartDOM: HTMLElement | null = document.getElementById('pieChart')

    if (pieChartDOM) {
      ECharts.dispose(pieChartDOM)
      const theme = this.theme || 'light'
      this.pieChart = ECharts.init(pieChartDOM, theme)
      this.pieChart.setOption(this.options)
    } else {
      // TODO: throw error
    }

    console.log('Echarts v5 pie charts component init >>')
  }

  onResize () {
    if (this.pieChart) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      this.pieChart.resize()
    }
  }

  /**
   * Use the css function `var` to define css properties.
   * https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css
   */
  get cssVars () {
    return {
      '--card-height': this.cardHeight.toString() + 'px'
    }
  }
}
</script>

<style scoped>
#pieChart {
  height: var(--card-height);
}
</style>
