import { Category, CategoryServiceFactory, CategoryConfiguration, CategoryLogFormat, LoggerType, LogLevel } from 'typescript-logging'

// Optionally change default settings, in this example set default logging to Info.
// Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Trace))

const logFormat = new CategoryLogFormat()
logFormat.showTimeStamp = false
const defaultConfig = new CategoryConfiguration(LogLevel.Info, LoggerType.Console, logFormat)

// defaultConfig.formatterLogMessage = (msg: CategoryLogMessage): string => {
//   // This example just shortens the message (will have no time info etc.)
//   return msg.message as string
// }

CategoryServiceFactory.setDefaultConfiguration(defaultConfig)

// Create categories, they will auto register themselves, one category without parent (root) and a child category.
export const quasarLog = new Category('Quasar')
export const echartsLog = new Category('Echarts')
export const vueEChartsLog = new Category('VUEECharts')
export const leafletLog = new Category('Leaflet')
export const pageLog = new Category('Page')

// Optionally get a logger for a category, since 0.5.0 this is not necessary anymore, you can use the category itself to log.
// export const log: CategoryLogger = CategoryServiceFactory.getLogger(cat)
