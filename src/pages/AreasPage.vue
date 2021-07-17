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
import { Vue, Options } from 'vue-class-component'
import { pageLog } from '../utility/logger'
import { loadCollectionSnapshot } from '../lib/firebase'
import { AreaData, actionTypes, getterTypes, moduleNames, useStore } from '../store'

@Options({
  name: 'AreasPage',
  watch: {
    '$q.dark.isActive' (value) {
      console.log(`[note] EChartVuePage >> Watch dark status: ${value ? 'dark' : 'light'} `)
    }
  },
  computed: {
    columns (): any {
      // Todo: doesn't work.
      const store = useStore()

      console.log(store)

      // eslint-disable-next-line
      return this.$store.state[moduleNames.area].columns
    },
    rows (): AreaData[] {
      // eslint-disable-next-line
      return this.$store.state[moduleNames.area].rows as AreaData[]
    },
    rowsCount (): number {
      // eslint-disable-next-line
      return this.$store.getters[getterTypes.area.AREAS_COUNT]
    }
  }
})
export default class AreasPage extends Vue {
  mounted () {
    pageLog.info('AreasPage mounted.')

    loadCollectionSnapshot()
  }

  init () {
    pageLog.info('AreasPage init.')
  }

  addArea () {
    this.$store.dispatch(actionTypes.area.ADD_AREA, {
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
