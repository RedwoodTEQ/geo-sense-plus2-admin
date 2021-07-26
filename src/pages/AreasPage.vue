<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        :columns="columns"
        :rows="rows"
        :loading="loading"
        :filter="filter"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:body-cell-buttons="props">
          <q-td :props="props">
            <div>
              <q-btn color="primary" label="Info/Edit" size="ms"/>
            </div>
          </q-td>
        </template>

        <template v-slot:top>
          <q-input dense debounce="300" color="primary" v-model="filter">
            <template v-slot:before>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-space/>
          <q-btn color="primary" size="ms" :disable="loading" label="Add Area" @click="toggleEdit(true)"/>
          <q-btn class="q-ml-sm" color="red" size="ms" :disable="loading" label="Remove Area" @click="removeArea"/>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-model="showEdit"
      @hide="toggleEdit(false)"
      no-scroll no-scrollbar
    >
      <AreaCard
        @submit-area="submitArea"
      ></AreaCard>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, Ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Vue, Options, setup } from 'vue-class-component'
import { pageLog } from 'src/utility/logger'
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

import firebase from 'firebase/app'

import AreaCard from 'components/areas/AreaCardComponent.vue'

interface IAreaDataFirebase {
  AssetRefs: firebase.firestore.DocumentReference[],
  EdgeMarkerRef: firebase.firestore.DocumentReference,
  LastUpdate: firebase.firestore.Timestamp,
  Name: string,
  Remarks: string
}

@Options({
  name: 'AreasPage',
  watch: {
    '$q.dark.isActive' (value) {
      console.log(`[note] EChartVuePage >> Watch dark status: ${value ? 'dark' : 'light'} `)
    }
  },
  components: { AreaCard }
})

export default class AreasPage extends Vue {
  apiManager = new APIManager()
  moduleName = moduleNames.area

  /** Use Setup() to wrap ref(): https://github.com/vuejs/vue-class-component/issues/530 */
  selected = setup<Ref<AreaData[]>>(() => ref([]))
  filter = setup<Ref<string>>(() => ref(''))
  loading = setup<Ref<boolean>>(() => ref(false))
  showEdit = setup<Ref<boolean>>(() => ref(false))

  /**
   * Columns data from DB
   * Alternative approach to create computed property, comparing to `@options#rows`
   * Pro: This property could be referenced by props `q-table#columns`
   * Con: Unknown issue?
   * ref:https://github.com/vuejs/vue-class-component/issues/416
   */
  get columns () {
    // FIXME: Can ont use `this.$store`
    const store = useStore()
    const areaState = store.state[moduleNames.area] as AreaStateInterface
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return areaState.columns
  }

  get rows (): AreaData[] {
    const $store = useStore()
    const areaState = $store.state[moduleNames.area] as AreaStateInterface
    return areaState.rows
  }

  get store () {
    return this.$store
  }

  get rowsCount (): number {
    const store = useStore()
    const type = getGlobalType(areaGetterLocalTypes.AREAS_COUNT, moduleNames.area)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(store.getters[type] as number)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return store.getters[type] as number
  }

  getSelectedString (): string {
    return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} of ${this.rowsCount} records.`
  }

  mounted () {
    pageLog.info('AreasPage mounted.')

    /** Fetch options */
    const options: FirebaseOptions = {
      category: DatabaseCategory.Firebase,
      path: 'edges',
      callbacks: {
        onAdded: (id, data: IAreaDataFirebase) => {
          pageLog.info({
            msg: 'Added',
            data: id
          })
          this.addToStore(id, data)
        },
        onModified: (id, data) => {
          pageLog.info({
            msg: 'Modified',
            data: id
          })
          console.log(data)
        },
        onRemoved: (id, data) => {
          pageLog.info({
            msg: 'Removed',
            data: id
          })
          console.log(data)
        }
      }
    }
    /** Fetch areas */
    this.apiManager.fetch<DatabaseCategory.Firebase>(options)
  }

  init () {
    pageLog.info('AreasPage init.')
  }

  /**
   * Add fetched area data to store
   */
  addToStore (id: string, data: IAreaDataFirebase) {
    console.log('addToTable >> moduleName: ', this.moduleName)

    const type = getGlobalType(areaActionLocalTypes.ADD_AREA, moduleNames.area)

    function formatData (dateIn: Date) {
      const yyyy = dateIn.getFullYear()
      const mm = dateIn.getMonth() + 1 // getMonth() is zero-based
      const dd = dateIn.getDate()
      const hh = dateIn.getHours()
      const min = dateIn.getMinutes()
      const ss = dateIn.getSeconds()
      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}` // Leading zeros for mm and dd
    }

    // Todo: Type guard of payload of dispatch. Consider optional properties.
    // Using module IActions's payload type as generic type.
    this.$store.dispatch(type, {
      edgeID: id,
      name: data.Name,
      floor: data.EdgeMarkerRef?.path || '',
      assetsCount: data.AssetRefs?.length || 0,
      lastUpdated: data.LastUpdate ? formatData(data.LastUpdate.toDate()) : '-' // Should not be optional property.
    })
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        pageLog.error('Add new area failed.', e)
      })
  }

  /**
   * Toggle area card component for editing.
   */
  toggleEdit (toggle: boolean) {
    this.showEdit = toggle
    this.loading = toggle
  }

  submitArea (area: any) {
    console.log('AreasPage >> receive submitArea event, area ', area)
    const options: FirebaseOptions = {
      category: DatabaseCategory.Firebase,
      path: 'edges',
      callbacks: {
        onComplete: () => {
          console.log('Post completed!')
        }
      }
    }
    this.apiManager.post<DatabaseCategory.Firebase>(options, area)
  }

  testEmit () {
    console.log('Test emit')
  }

  removeArea () {
    console.log('TODO remove row')
  }
}
</script>
