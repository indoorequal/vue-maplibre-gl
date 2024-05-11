// Popup
//
// A map with a marker and a popup
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-navigation-control />
    <mgl-marker :coordinates="coordinates">
      <mgl-popup>
        <h1>Hello</h1>
        <p>HTML content</p>
      </mgl-popup>
    </mgl-marker>
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
  MglMarker,
  MglPopup,
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = [12.550343, 55.665957];
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
