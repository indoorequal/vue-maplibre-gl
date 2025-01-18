// Add an icon to the map
//
// Add an icon to the map from an external URL and use it in a symbol layer.
<template>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Flat_Coated_Retriever_-_black.jpg"
    crossorigin="anonymous"
    ref="dog"
    style="display: none"
  />
  <mgl-map
    :map-style="style"
    height="500px"
  >
    <mgl-image
      id="cat"
      url="https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png"
    />
    <mgl-image
      id="dog"
      :image="dog"
    />
    <mgl-navigation-control />
    <mgl-geo-json-source
      source-id="point"
      :data="geojsonSource"
    >
      <mgl-symbol-layer
        layer-id="cat"
        :layout="layout"
      />
    </mgl-geo-json-source>
  </mgl-map>
</template>

<script setup>
import {
  MglMap,
  MglNavigationControl,
  MglImage,
  MglGeoJsonSource,
  MglSymbolLayer
} from '@indoorequal/vue-maplibre-gl';
import { useTemplateRef } from 'vue'

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const geojsonSource = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      },
      properties: {
        symbol: 'cat'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [42, 42]
      },
      properties: {
        symbol: 'dog'
      }
    }
  ]
};

const layout = {
  'icon-image': ['get', 'symbol'],
  'icon-size': 0.25
};

const dog = useTemplateRef('dog');
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
