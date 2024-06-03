// Filter
//
// Filter features
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-geo-json-source source-id="earthquakes" :data="earthquakesUrl">
      <mgl-circle-layer layer-id="eathquakes" :paint="paint" :filter="filter" />
    </mgl-geo-json-source>
  </mgl-map>
  <label><input type="checkbox" v-model="feltFilter" /> Apply felt filter</label>
</template>

<script setup>
import {
  MglMap,
  MglGeoJsonSource,
  MglCircleLayer
} from '@indoorequal/vue-maplibre-gl';
import { ref, watch } from 'vue';

const style = 'https://demotiles.maplibre.org/style.json';
const center = [-117, 32];
const zoom = 0;
const earthquakesUrl = 'https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson';
const paint = {
  'circle-color': '#ff0000'
};
const feltFilter = ref(false);
const filter = ref(["all",["==","felt",4]]);

watch(feltFilter, (v) => {
 filter.value = ["all",["==","felt", v ? 5 : 4]];
});

</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
