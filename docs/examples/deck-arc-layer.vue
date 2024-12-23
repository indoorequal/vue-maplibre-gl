<template>
  <MglMap
    height="100vh"
    :map-style="style"
    :center
    :zoom
    :maxZoom
    :pitch
    :bearing
  >
    <MglDeckArcLayer
      id="ArcLayer"
      :data
      :getSourceColor="(d) => [Math.sqrt(d.inbound), 140, 0]"
      :getSourcePosition="(d) => d.from.coordinates"
      :getTargetColor="(d) => [Math.sqrt(d.outbound), 140, 0]"
      :getTargetPosition="(d) => d.to.coordinates"
      :getTooltip="
        ({ object }) => object && `${object.from.name} to ${object.to.name}`
      "
      :getWidth="12"
      :pickable="true"
    />
  </MglMap>
</template>

<script setup lang="ts">
import { MglMap, MglDeckArcLayer } from "@indoorequal/vue-maplibre-gl";
import { ref } from "vue";

const style = ref(
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
);
const center = ref([-122.4, 37.74]);
const zoom = ref(11);
const maxZoom = ref(20);
const pitch = ref(30);
const bearing = ref(0);

const data =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-segments.json";
</script>