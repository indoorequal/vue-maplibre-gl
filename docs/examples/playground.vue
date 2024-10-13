// Playground
//
// Play with some of the components
<template>
<div>
  <div>
    <mgl-map
      v-if="showMap"
      height="400px"
      :center="center"
      :zoom="zoom"
      :attribution-control="false"
      @map:load="onLoad"
      @map:zoomstart="isZooming = true"
      @map:zoomend="isZooming = false"
    >
      <mgl-fullscreen-control/>
      <mgl-attribution-control/>
      <mgl-navigation-control/>
      <mgl-scale-control/>
      <mgl-geolocate-control/>
    </mgl-map>
  </div>
  <div style="margin-bottom: 20px">Version: {{ mapVersion }}</div>
  Loaded Count: {{ loaded }}<br>
  Is Zooming: {{ isZooming }}<br>
  <div>
    <input type="checkbox" v-model="showMap" id="showmap">
    <label for="showmap">Show Map</label>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {
  MglDefaults,
  MglEvent,
  useMap,
  MglMap,
  MglFullscreenControl,
  MglAttributionControl,
  MglNavigationControl,
  MglScaleControl,
  MglGeolocateControl,
} from '@indoorequal/vue-maplibre-gl';
import { LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';

MglDefaults.style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';

export default defineComponent({
  name      : 'App',
  components: {
    MglGeolocateControl,
    MglScaleControl,
    MglNavigationControl,
    MglAttributionControl,
    MglFullscreenControl,
    MglMap
  },
  setup() {
    const map               = useMap(),
          mapVersion        = ref<string>(),
          loaded            = ref(0);

    watch(() => map.isLoaded, () => (console.log('IS LOADED', map)), { immediate: true });
    watch(() => map.isMounted, (v: boolean) => (console.log('IS MOUNTED', v)), { immediate: true });

    function onLoad(e: MglEvent) {
      loaded.value++;
      mapVersion.value = e.map.version;
      console.log(e.type, e, e.map.version);
    }

    return {
      loaded, map, mapVersion, onLoad,
      isZooming                 : ref(false),
      showMap                   : ref(true),
      center                    : [ -122.483696, 37.833818 ] as LngLatLike,
      zoom                      : 15,
    };
  }
});
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
