// Deck Scattered Plot Layer
//
// A Deck.gl Scattered Plot Layer Example

<template>
  <MglMap :map-style="style" :center :zoom :maxZoom :pitch height="500px">
    <MglDeckScatteredPlotLayer
      id="ScatterplotLayer"
      :data="DATA_URL"
      :radiusScale="6"
      :getPosition="(d) => d.coordinates"
      :getFillColor="[255, 140, 0]"
      :getLineColor="[0, 0, 0]"
      :getRadius="(d) => Math.sqrt(d.exits)"
      :lineWidthMinPixels="1"
      :radiusMaxPixels="100"
      :radiusMinPixels="1"
      :stroked="true"
      :opacity="0.8"
      :pickable="true"
      :getTooltip="({ object }) => object && object.name"
    />
  </MglMap>
</template>

<script setup lang="ts">
import {
  MglMap,
  MglDeckScatteredPlotLayer,
} from "@indoorequal/vue-maplibre-gl";

const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json";

const center = [-122.4, 37.74];
const zoom = 11;
const style =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";
const maxZoom = 20;
const pitch = 30;
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
