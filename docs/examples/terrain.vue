// Terrain
//
// 3D Terrain
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    :pitch="pitch"
    height="500px"
  >
    <MglRasterDemSource
      source-id="terrain"
      url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
      :tile-size="256"
    >
    </MglRasterDemSource>
    <MglRasterDemSource
      source-id="hillshade"
      url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
      :tile-size="256"
    >
      <MglHillshadeLayer
        layer-id="hills"
        :paint="{'hillshade-shadow-color': '#473B24'}" />
    </MglRasterDemSource>

    <mgl-navigation-control
      :visualize-pitch="true"
    />
    <custom-terrain-control />
  </mgl-map>
</template>

<script setup>
import { defineComponent } from 'vue';
import {
  MglMap,
  MglRasterDemSource,
  MglHillshadeLayer,
  MglNavigationControl,
  useControl,
} from '@indoorequal/vue-maplibre-gl';
import { TerrainControl } from 'maplibre-gl';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const center = [11.39085, 47.27574];
const zoom = 12;
const pitch = 70;

const CustomTerrainControl = defineComponent({
  setup() {
    return useControl(
      () => {
        return new TerrainControl({
           source: 'terrain',
           exaggeration: 1
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
</style>
