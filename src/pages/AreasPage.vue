<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
          :columns="columns"
          :rows="rows"
          row-key="name"
      />
    </div>
  </q-page>
  <p>Rows count:</p>
  <p>{{ rowsCount }}</p>
  <q-btn push color="primary" label="Add" @click="addArea"/>
</template>

<script lang="ts">
import { Vue, Options, setup } from 'vue-class-component'
import { pageLog } from '../utility/logger'
import APIManager, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FirebaseOptions, RESTFullOptions,
  DatabaseCategory
} from '../lib/api-manager'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AreaData, AreaStateInterface,
  moduleNames,
  areaGetterLocalTypes, areaActionLocalTypes,
  getGlobalType, useStore
} from '../store'

@Options({
  name: 'AreasPage',
  watch: {
    '$q.dark.isActive' (value) {
      console.log(`[note] EChartVuePage >> Watch dark status: ${value ? 'dark' : 'light'} `)
    }
  },
  computed: {
    // columns (): any {
    //   const $store = useStore()
    //   const areaState = $store.state[moduleNames.area] as AreaStateInterface
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //   return areaState.columns
    // },
    rows (): AreaData[] {
      const $store = useStore()
      const areaState = $store.state[moduleNames.area] as AreaStateInterface
      return areaState.rows
    },
    rowsCount (): number {
      const $store = useStore()
      const type = getGlobalType(areaGetterLocalTypes.AREAS_COUNT, moduleNames.area)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return $store.getters[type] as number
    }
  }
})

export default class AreasPage extends Vue {
  apiManager = new APIManager()
  moduleName = moduleNames.area

  /**
   * Columns data from DB
   * Alternative approach to create computed property, comparing to `@options#rows`
   * Pro: This property could be referenced by props `q-table#columns`
   * Con: Unknown issue?
   * ref:https://github.com/vuejs/vue-class-component/issues/416
   */
  columns = setup(() => {
    // FIXME: Can ont use `this.$store`
    const store = useStore()
    const areaState = store.state[moduleNames.area] as AreaStateInterface
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return areaState.columns
  })

  get store () {
    return this.$store
  }

  mounted () {
    pageLog.info('AreasPage mounted.')

    // // Can use `this.$store`
    // console.log('this.$store:', this.$store)

    const options: FirebaseOptions = {
      category: DatabaseCategory.Firebase,
      path: 'edges',
      callbacks: {
        onAdded: (id, data) => {
          pageLog.info({ msg: 'Added', data: id })
          console.log(data)
        },
        onModified: (id, data) => {
          pageLog.info({ msg: 'Modified', data: id })
          console.log(data)
        },
        onRemoved: (id, data) => {
          pageLog.info({ msg: 'Removed', data: id })
          console.log(data)
        }
      }
    }
    this.apiManager.fetch<DatabaseCategory.Firebase>(options)
  }

  init () {
    pageLog.info('AreasPage init.')
  }

  addArea () {
    console.log('addArea >> moduleName: ', this.moduleName)

    const type = getGlobalType(areaActionLocalTypes.ADD_AREA, moduleNames.area)
    this.$store.dispatch(type, {
      id: 0,
      name: `added ${Math.random()}`,
      edgeID: '0092769BB9EA2F03',
      floorID: '3cRUIEprlnW8bciES7vO',
      assetsCount: 7,
      lastUpdated: new Date('Jun 3 2021').toDateString()
    })
      .catch(e => {
        pageLog.error('Add new area failed.', e)
      })
  }
}
</script>
