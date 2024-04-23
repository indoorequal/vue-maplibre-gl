// Marker
//
// A map with a marker
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <mgl-navigation-control />
    <mgl-marker :coordinates="coordinates" color="#cc0000" />
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
  MglMarker
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = [12.550343, 55.665957];
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
@import "@indoorequal/vue-maplibre-gl/dist/vue-maplibre-gl.css";

body {
  margin: 0;
}
html, body, #app { height: 100%; }
</style>
