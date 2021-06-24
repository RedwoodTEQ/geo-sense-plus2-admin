<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
          :rows="rows"
          :columns = "columns"
          row-key="name"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { pageLog } from '../utility/logger'

interface AreaData {
  id: number;
  name: string;
  edgeID: string;
  floorID: string;
  assetsCount: number;
  lastUpdated: Date;
}

@Options({
  name: 'AreasPage',
  watch: {
    '$q.dark.isActive' (value) {
      console.log(`[note] EChartVuePage >> Watch dark status: ${value ? 'dark' : 'light'} `)
    }
  }
})
export default class AreasPage extends Vue {
  columns = [
    {
      name: 'id',
      required: true,
      label: 'Areas(ID)',
      align: 'left',
      field: (row: AreaData) => row.id,
      format: (val: string) => `${val}`,
      sortable: true,
      classes: 'bg-grey-2 ellipsis',
      style: 'max-width: 100px',
      headerClasses: 'bg-primary text-white'
    },
    { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
    { name: 'edgeID', align: 'center', label: 'Edge ID', field: 'edgeID', sortable: true },
    { name: 'floorID', label: 'Floor ID', field: 'floorID', sortable: true },
    { name: 'assetsCount', label: 'Assets Count', field: 'assetsCount', sortable: true },
    { name: 'lastUpdated', label: 'Last Update', field: 'lastUpdated', sortable: true }
  ]

  rows = [
    {
      id: 0,
      name: 'area 12',
      edgeID: '0092769BB9EA2F03',
      floorID: '3cRUIEprlnW8bciES7vO',
      assetsCount: 7,
      lastUpdated: new Date('Jun 3 2021').toDateString()
    },
    {
      id: 1,
      name: 'area 31',
      edgeID: '0092969BB9EA2F03',
      floorID: '3cR0IEprlnW8bciES7vO',
      assetsCount: 3,
      lastUpdated: new Date('Jun 13 2021').toDateString()
    },
    {
      id: 2,
      name: 'area 34',
      edgeID: '0092769BB9EA2F03',
      floorID: '3cRoIEprlnW8bciES7vO',
      assetsCount: 3,
      lastUpdated: new Date().toDateString()
    },
    {
      id: 3,
      name: 'area 64',
      edgeID: '0090789BB9EA2F03',
      floorID: '3cRooEirlnW8bciES7vO',
      assetsCount: 2,
      lastUpdated: new Date('Jun 23 2021').toDateString()
    }
  ]

  mounted () {
    pageLog.info('AreasPage mounted.')
  }

  init () {
    console.log('AreasPage init.')
  }
}
</script>
