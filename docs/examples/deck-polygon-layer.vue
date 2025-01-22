// Deck Polygon Layer
//
// A Deck.gl Polygon Layer Example.
<template>
  <MglMap
    :map-style="MAP_STYLE"
    :center
    :zoom
    :maxZoom
    :pitch
    :bearing
    height="500px"
  >
    <MglDeckPolygonLayer
      id="PolygonLayer"
      :data="DATA_URL"
      :getElevation="(d) => d.population / d.area / 10"
      :getFillColor="(d) => [d.population / d.area / 60, 140, 0]"
      :getLineColor="[255, 255, 255]"
      :getLineWidth="20"
      :getPolygon="(d) => d.contour"
      :lineWidthMinPixels="1"
      :pickable="true"
      :getTooltip="
        ({ object }) =>
          object && `${object.zipcode} Population: ${object.population}`
      "
    />
  </MglMap>
</template>

<script setup lang="ts">
import { MglMap, MglDeckPolygonLayer } from "@indoorequal/vue-maplibre-gl";

// Source data CSV
const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-zipcodes.json";

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.74,
  zoom: 11,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const { longitude, latitude, zoom, maxZoom, pitch, bearing } =
  INITIAL_VIEW_STATE;
const center = [longitude, latitude];
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
