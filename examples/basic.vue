// Basic
//
// A basic map with a style and controls
<template>
  <mgl-map :map-style="style">
    <mgl-navigation-control />
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
@import "@indoorequal/vue-maplibre-gl/dist/vue-maplibre-gl.css";

body {
  margin: 0;
}
html, body, #app { height: 100%; }
</style>
