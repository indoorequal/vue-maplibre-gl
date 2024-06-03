// Video source
//
// A video source
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-video-source source-id="video-source" :coordinates="coordinates" :urls="urls">
      <mgl-raster-layer layer-id="video-layer" />
    </mgl-video-source>
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
  MglVideoSource,
  MglRasterLayer
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [-122.514426, 37.562984];
const zoom = 17;
const urls = ['https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4', 'https://static-assets.mapbox.com/mapbox-gl-js/drone.webm'];
const coordinates =  [[-122.51596391201019, 37.56238816766053],
                    [-122.51467645168304, 37.56410183312965],
                    [-122.51309394836426, 37.563391708549425],
                    [-122.51423120498657, 37.56161849366671]];
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
