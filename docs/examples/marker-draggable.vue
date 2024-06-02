// Draggable Marker
//
// A map with a draggable marker
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="300px"
  >
    <mgl-navigation-control />
    <mgl-marker
      v-model:coordinates="coordinates"
      :draggable="draggable"
      @dragstart="console.log('dragstart')"
      @drag="console.log('drag')"
      @dragend="console.log('dragend')"
    />
  </mgl-map>
  <label><input type="checkbox" v-model="draggable" />Enable draggable marker</label>
  <br />
  Marker coordinates: {{ coordinates }}
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
  MglMarker
} from '@indoorequal/vue-maplibre-gl';
import { ref } from 'vue';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = ref([12.550343, 55.665957]);
const draggable = ref(true);
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
