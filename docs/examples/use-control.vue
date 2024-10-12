// useControl composable
//
// Usage of the useControl
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <InspectControl />
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  useControl,
} from '@indoorequal/vue-maplibre-gl';
import { defineComponent } from 'vue';
import maplibregl from 'maplibre-gl';
import MaplibreInspect from '@maplibre/maplibre-gl-inspect';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const center = [12.550343, 55.665957];
const zoom = 8;

const InspectControl = defineComponent({
  setup() {
    return useControl(
      () => {
        return new MaplibreInspect({
          popup: new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
          })
        });
      }, {
        position: 'top-right'
      });
  },

  render() {
    return null;
  }
});
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
@import "@maplibre/maplibre-gl-inspect/dist/maplibre-gl-inspect.css";
</style>
