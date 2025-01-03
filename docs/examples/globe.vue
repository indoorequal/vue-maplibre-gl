// Display a globe
//
// Display a globe with a vector map.
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
  useMap,
} from '@indoorequal/vue-maplibre-gl';
import { watch } from 'vue';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const center = [12.550343, 55.665957];
const zoom = 1;

const map = useMap();
watch(
  () => map.isLoaded,
  () => {
    map.map.setProjection({
        type: 'globe',
    });
 }
);
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
