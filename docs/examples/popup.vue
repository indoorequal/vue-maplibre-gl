// Popup
//
// A popup on the map
<template>
  <button @click="togglePopup">Show / Hide the popup</button>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-navigation-control />
    <mgl-popup
      v-if="displayPopup"
      :coordinates="coordinates"
      :close-button="false"
      text="The content of the popup"
    />
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
  MglPopup,
} from '@indoorequal/vue-maplibre-gl';
import { ref } from 'vue'

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = [12.550343, 55.665957];
const displayPopup = ref(true);

function togglePopup() {
  displayPopup.value = !displayPopup.value;
}

</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
