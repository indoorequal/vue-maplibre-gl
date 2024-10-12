// Vector source
//
// Display a vector source
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-vector-source
      source-id="libraries"
      :tiles="librariesSourceTiles"
    >
      <mgl-circle-layer
        layer-id="libraries"
        source-layer="libraries"
        :paint="librariesLayerCirclesPaint"
      />
    </mgl-vector-source>

  </mgl-map>
</template>

<script setup lang="ts">
import {
  MglMap,
  MglVectorSource,
  MglCircleLayer
} from '@indoorequal/vue-maplibre-gl';
import { CircleLayerSpecification, LineLayerSpecification, LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';

const center = [-3.002233964444031, 53.71773428766181];
const zoom = 5;

const librariesSourceTiles = [ 'https://api.librarydata.uk/libraries/{z}/{x}/{y}.mvt' ];
const librariesLayerCirclesPaint = {
  'circle-radius': 5,
  'circle-color' : '#1b5e20'
} as CircleLayerSpecification['paint'];
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
