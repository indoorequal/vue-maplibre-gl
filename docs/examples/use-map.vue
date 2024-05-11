// useMap composable
//
// Usage of the useMap composable
<template>
  <div>
    <mgl-map
      :map-style="style"
      :center="center"
      :zoom="zoom"
      height="200px"
    />
    <mgl-map
      :map-style="style"
      :center="center"
      :zoom="zoom"
      map-key="second"
      height="200px"
    />
    MapOne loaded {{ mapOne.isLoaded }}
    <br />
    MapSecond loaded {{ mapSecond.isLoaded }}
  </div>
</template>

<script setup>
import {
  MglMap,
  useMap
} from '@indoorequal/vue-maplibre-gl';
import { watch } from 'vue';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [12.550343, 55.665957];
const zoom = 8;
const mapOne = useMap();
const mapSecond = useMap('second');
watch(() => mapOne.isLoaded, (isLoaded) => { console.log('mapOne loaded ', isLoaded) })
watch(() => mapSecond.isLoaded, (isLoaded) => { console.log('mapSecond loaded ', isLoaded) })
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
