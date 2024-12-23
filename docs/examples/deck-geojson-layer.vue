<template>
  <MglMap height="100vh" :map-style="style" :center :zoom>
    <MglDeckGeojsonLayer
      id="deck-gl-geojson"
      :data
      pointType="circle+text"
      :stroked="false"
      :filled="true"
      :extruded="true"
      :pickable="true"
      :getElevation="30"
      :getFillColor="[160, 160, 180, 200]"
      :getLineColor="
        (f) => {
          const hex = f.properties.color;
          // convert to RGB
          return hex
            ? hex.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16))
            : [0, 0, 0];
        }
      "
      :getLineWidth="20"
      :getPointRadius="4"
      :getText="(f) => f.properties.name"
      :getTextSize="12"
      :getTooltip="
        ({ object }) =>
          object && (object.properties.name || object.properties.station)
      "
    />
  </MglMap>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MglMap, MglDeckGeojsonLayer } from "@indoorequal/vue-maplibre-gl";

const style = ref(
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
);
const center = ref([-122.4, 37.74]);
const zoom = ref(11);

const data =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json";
</script>