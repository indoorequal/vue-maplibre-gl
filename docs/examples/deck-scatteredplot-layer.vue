<template>
  <MglMap height="100vh" :map-style="style" :center :zoom>
    <MglDeckScatteredPlotLayer
      id="people-in-NY"
      :data="DATA_URL"
      :radiusScale="radius"
      :radiusMinPixels="0.25"
      :getPosition="(d) => [d[0], d[1], 0]"
      :getFillColor="(d) => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR)"
      :getRadius="1"
    />
  </MglMap>
</template>

<script setup lang="ts">
import {MglMap, MglDeckScatteredPlotLayer} from '@indoorequal/vue-maplibre-gl'

const MALE_COLOR = [0, 128, 255]
const FEMALE_COLOR = [255, 0, 128]

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json'

const center =[-74, 40.7]
const zoom = 11
const style = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
const radius = 30
</script>
