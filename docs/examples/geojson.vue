// Geojson source
//
// Render a dynamic geojson source
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-geo-json-source
      source-id="geojson"
      :data="geojsonSource.data"
    >
      <mgl-line-layer
        layer-id="geojson"
        :layout="layout"
        :paint="paint"
      />
    </mgl-geo-json-source>
  </mgl-map>
</template>

<script setup>
import {  onMounted, ref } from 'vue';
import {
  MglMap,
  MglGeoJsonSource,
  MglLineLayer,
} from '@indoorequal/vue-maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=cQX2iET1gmOW38bedbUh';
const center = [ -122.483696, 37.833818 ];
const zoom = 15;

const lineString = [
  [ -122.483696, 37.833818 ],
  [ -122.483482, 37.833174 ],
  [ -122.483396, 37.8327 ],
  [ -122.483568, 37.832056 ],
  [ -122.48404, 37.831141 ],
  [ -122.48404, 37.830497 ],
  [ -122.483482, 37.82992 ],
  [ -122.483568, 37.829548 ],
  [ -122.48507, 37.829446 ],
  [ -122.4861, 37.828802 ],
  [ -122.486958, 37.82931 ],
  [ -122.487001, 37.830802 ],
  [ -122.487516, 37.831683 ],
  [ -122.488031, 37.832158 ],
  [ -122.488889, 37.832971 ],
  [ -122.489876, 37.832632 ],
  [ -122.490434, 37.832937 ],
  [ -122.49125, 37.832429 ],
  [ -122.491636, 37.832564 ],
  [ -122.492237, 37.833378 ],
  [ -122.493782, 37.833683 ]
];

const geojsonSource = ref({
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: lineString.slice(0, 1)
        }
      }
    ]
  },
});

onMounted(() => {
  setInterval(() => {
    if (geojsonSource.value.data.features[ 0 ].geometry.coordinates.length >= lineString.length) {
      geojsonSource.value.data = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: lineString.slice(0, 1)
            }
          }
        ]
      };
    } else {
      geojsonSource.value.data = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                ...geojsonSource.value.data.features[ 0 ].geometry.coordinates,
                lineString[ geojsonSource.value.data.features[ 0 ].geometry.coordinates.length ]
              ]
            }
          }
        ]
      };
    }
  }, 1000);
});

const layout = {
  'line-join': 'round',
  'line-cap' : 'round'
};

const paint = {
  'line-color': '#FF0000',
  'line-width': 8
};

</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
