// Custom Marker
//
// A map with a custom marker
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-marker :coordinates="coordinates">
      <template v-slot:marker>
        <div :style="{ backgroundColor: 'red', width: '10px', height: '10px' }"></div>
      </template>
    </mgl-marker>
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglMarker
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = [12.550343, 55.665957];
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
