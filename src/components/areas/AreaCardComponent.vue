<!--
Component: AreaCard
Content: All fields of an area.
Usage: Depending on passed parameter, it could be used to update an area, or add a new area.
-->

<template>
  <div id="area-card-container" class="row items-start hide-scrollbar">
      <q-card id="area-card" class="my-card" no-scroll flat bordered square>
      <q-card-section>
        <div class="text-h5">Area</div>
      </q-card-section>
      <div id="area-card-content">
      <q-form
          @submit="onSubmit"
          @reset="onReset"
      >
        <q-input
            filled
            v-model="name"
            label="Area name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Can not be empty']"
        />
        <q-input
            filled
            v-model="floor"
            label="Floor *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Can not be empty']"
        />
        <q-input
            filled
            v-model="marker"
            label="Marker *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Can not be empty']"
        />
        <q-input
            filled
            v-model="location"
            label="Location"
            lazy-rules
            :rules="[]"
        />
        <q-input style="padding-top:20px"
            filled
            v-model="remark"
            label="Remark"
            type="textarea"
        />

        <!--Floorplan edge marker assignment-->
        <q-card class="my-card" flat padding bordered square style="margin-top: 10px">
          <q-card-actions>
            <div class="text-h6">Edit floorplan edge marker assignment</div>
            <q-space />
            <q-btn
                color="grey"
                round
                flat
                dense
                :icon="expandedFloorplanAssignment ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expandedFloorplanAssignment = !expandedFloorplanAssignment"
            />
          </q-card-actions>
          <q-slide-transition>
            <div v-show="expandedFloorplanAssignment">
              <q-separator/>
              <q-card-section horizontal>
              <q-select class="col-6 flex flex-center"
                  v-model="floorplanSelectionToggle"
                  filled
                  :options="floorplanSelectionOptions" label="Floorplan"
              />
              <q-separator vertical/>
              <q-select class="col-6 flex flex-center"
                  v-model="edgeMarkerSelectionToggle"
                  filled
                  :options="edgeMarkerSelectionOptions" label="Edge Marker"
              />
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>

        <!-- Assets List-->
          <q-card class="my-card" flat padding bordered square style="margin-top: 10px">
          <q-card-actions>
                           <div class="text-h6">Assets List</div>
                           <q-space />
                           <q-btn
                           color="grey"
                           round
                           flat
                           dense
                           :icon="expandedAssetsList ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                           @click="expandedAssetsList = !expandedAssetsList"
                           />
                           </q-card-actions>
          <q-slide-transition>
                               <div v-show="expandedAssetsList">
                               <q-separator/>
                               <q-markup-table>
                               <thead>
                               <tr>
                               <th class="text-left">No.</th>
                               <th class="text-right">Name</th>
                               <th class="text-right">ID</th>
                               </tr>
                               </thead>
                               <tbody>
                               <tr>
                               <td class="text-left">1</td>
                               <td class="text-right">name 7</td>
                               <td class="text-right">1918FC01F1FF</td>
                               </tr>
                               <tr>
                               <td class="text-left">2</td>
                               <td class="text-right">name 7</td>
                               <td class="text-right">1918FC01F1FF</td>
                               </tr>
                               <tr>
                               <td class="text-left">3</td>
                               <td class="text-right">name 7</td>
                               <td class="text-right">1918FC01F1FF</td>
                               </tr>
                               </tbody>
                               </q-markup-table>
                               </div>
                               </q-slide-transition>
        </q-card>

        <div style="padding-top: 20px">
          <q-btn label="Add" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, prop, Options, setup } from 'vue-class-component'
import { useQuasar } from 'quasar'
import { Meta } from '../models'
import { componentLog } from 'src/utility/logger'
import { ref, Ref } from 'vue'

class Props {
  cardHeight = prop<number>({ default: 250 })

  readonly meta!: Meta;
  readonly active!: boolean;
}

@Options({
  name: 'AreaCard'
})

export default class AreaCardComponent extends Vue.with(Props) {
  name = setup<Ref<string>>(() => ref(''))
  remark = setup<Ref<string>>(() => ref(''))
  location = setup<Ref<string>>(() => ref(''))
  floor = setup<Ref<string>>(() => ref(''))
  marker = setup<Ref<string>>(() => ref(''))
  expandedAssetsList = setup<Ref<boolean>>(() => ref(false))

  expandedFloorplanAssignment = setup<Ref<boolean>>(() => ref(false))
  floorplanSelectionToggle = setup<Ref<string>>(() => ref(''))
  floorplanSelectionOptions = setup<Ref<string[]>>(() => ref(
    ['Floorplan 01', 'Floorplan 02', 'Floorplan 03']
  ))

  edgeMarkerSelectionToggle = setup<Ref<string>>(() => ref(''))
  edgeMarkerSelectionOptions = setup<Ref<string[]>>(() => ref(
    ['Edge Marker 01', 'Edge Marker 02', 'Edge Marker 03']
  ))

  $q = useQuasar()

  mounted () {
    componentLog.info('Area card component mounted >>')
    this.init()
  }

  init () {
    componentLog.info('Area card component init >>')
  }

  onSubmit () {
    this.$q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })

    // Todo: The same type with `AreasPage.vue#addToStore`
    this.$emit('submit-area', {
      AssetRefs: ['1918FC01FS1', '1918FC01F1FF'],
      EdgeMarkerRef: { path: '/floorplanSelectionOptions/abc/efc' },
      Name: 'areaMarkup',
      Remark: 'This is remark.'
    })
  }

  onReset () {
    this.name = ''
    this.remark = ''
    this.location = ''
    this.floor = ''
    this.marker = ''
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
#area-card-container {
  width: 80%;
}
#area-card {
  width: 100%;
}

#area-card-content {
  padding: 10px
}

/* On Chrome */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* For Firefox and IE */
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

</style>
