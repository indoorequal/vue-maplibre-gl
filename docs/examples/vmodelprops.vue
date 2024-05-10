// V-model props
//
// Support for v-model props on the map
<template>
  <div>
    <mgl-map
      :map-style="style"
      v-model:center="center"
      v-model:zoom="zoom"
      v-model:pitch="pitch"
      v-model:bearing="bearing"
      height="400px"
    >
      <mgl-navigation-control />
    </mgl-map>
    zoom: {{ zoom }}
    <br>
    center: {{ center }}
    <br>
    pitch: {{ pitch }}
    <br>
    bearing: {{ bearing }}
  </div>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
} from '@indoorequal/vue-maplibre-gl';
import { ref } from 'vue';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
const center = ref([12.550343, 55.665957]);
const zoom = ref(8);
const pitch = ref(0);
const bearing = ref(0);
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
@import "@indoorequal/vue-maplibre-gl/dist/vue-maplibre-gl.css";

body {
  margin: 0;
}
html, body, #app { height: 100%; }
</style>
