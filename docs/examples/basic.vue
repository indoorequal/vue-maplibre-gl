// Basic
//
// A basic map with a style and controls
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-navigation-control />
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const center = [12.550343, 55.665957];
const zoom = 8;
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
