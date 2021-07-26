/**
 * Import ECharts modules on demanding.
 * Set `v-chart` component to be ECharts.
 */

import { boot } from 'quasar/wrappers'
import VUEECharts, { THEME_KEY } from 'vue-echarts'
import { use } from 'echarts/core'
import * as ECharts from 'echarts'
import { quasarLog } from '../utility/logger'

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  PieChart
} from 'echarts/charts'
import {
  TitleComponent, TooltipComponent, LegendComponent
} from 'echarts/components'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

export default boot(({ app }) => {
  // Set `v-chart` component to be Echarts on app
  quasarLog.info('Echarts boot')
  quasarLog.debug({
    msg: 'VUEECharts: ',
    data: VUEECharts
  })
  quasarLog.debug({
    msg: 'ECharts: ',
    data: ECharts
  })

  app.component('v-chart', VUEECharts)
})

export { VUEECharts, THEME_KEY, ECharts }
