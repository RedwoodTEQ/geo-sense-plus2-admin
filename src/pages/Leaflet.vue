<!--
Leaflet demo page.
  Install packages:
    `yarn add leaflet`
    `yarn add @types/leaflet -D`

    ref: https://leafletjs.com/examples/quick-start/
-->

<template>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""/>

  <q-page padding>
    <!-- content -->
    <div id="mapid"></div>
  </q-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ExampleComponent from 'components/ClassComponent.vue'
import * as Leaflet from 'leaflet'

@Options({
  components: { ExampleComponent },
  name: 'leafletPage'
})
export default class LeafletPage extends Vue {
  mounted () {
    console.log('[Info] Init Leaflet component.')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const myMap: Leaflet.Map = Leaflet
      .map('mapid')
      .setView([51.505, -0.09], 13)

    Leaflet.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmlyZGluZm9yZXN0IiwiYSI6ImNrb2JmajkxajAxOGUyd21qdXBrbzBoMnEifQ.rTot6lE-RAUCc6hyz-URcw'
      })
      .addTo(myMap)
  }
}
</script>

<style>
#mapid {height: 800px;}
</style>
