// Playground
//
// Play with some of the components
<template>
<div>
  <div>
    <mgl-map
      v-if="showMap"
      height="400px"
      ref="map"
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
      <mgl-custom-control v-if="showCustomControl" :position="controlPosition">
        <button class="maplibregl-ctrl-icon" style="color: deepskyblue">
          <svg><path :d="buttonIcon" fill="currentColor" /></svg>
        </button>
      </mgl-custom-control>
      <mgl-marker :coordinates="markerCoordinates" color="#cc0000" :scale="0.5"/>
    </mgl-map>
  </div>
  <div style="margin-bottom: 20px">Version: {{ mapVersion }}</div>
  Loaded Count: {{ loaded }}<br>
  Is Zooming: {{ isZooming }}<br>
  <div>
    <input type="radio" id="one" value="top-left" v-model="controlPosition"/>
    <label for="one">top-left</label>
    <br/>
    <input type="radio" id="tw0" value="top-right" v-model="controlPosition"/>
    <label for="tw0">top-right</label>
    <br/>
    <input type="radio" id="three" value="bottom-left" v-model="controlPosition"/>
    <label for="three">bottom-left</label>
    <br/>
    <input type="radio" id="four" value="bottom-right" v-model="controlPosition"/>
    <label for="four">bottom-right</label>
    <br/>
    <span>Style Position: {{ controlPosition }}</span>
  </div>
  <div>
    <input type="checkbox" v-model="showCustomControl" id="showcustom">
    <label for="showcustom">Show Custom Control</label>
  </div>
  <div>
    <input type="checkbox" v-model="showMap" id="showmap">
    <label for="showmap">Show Map</label>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import {
  MglDefaults,
  MglEvent,
  Position,
  useMap,
  MglMap,
  MglFullscreenControl,
  MglAttributionControl,
  MglNavigationControl,
  MglScaleControl,
  MglGeolocateControl,
  MglCustomControl,
  MglMarker,
} from '@indoorequal/vue-maplibre-gl';
import { mdiCursorDefaultClick } from '@mdi/js';
import { LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';

MglDefaults.style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';

export default defineComponent({
  name      : 'App',
  components: {
    MglMarker, MglCustomControl,
    MglGeolocateControl, MglScaleControl, MglNavigationControl, MglAttributionControl, MglFullscreenControl, MglMap
  },
  setup() {
    const map               = useMap(),
          mapVersion        = ref<string>(),
          showCustomControl = ref(true),
          loaded            = ref(0),
          markerCoordinates = ref<LngLatLike>([ 13.377507, 52.516267 ]);

    watch(() => map.isLoaded, () => (console.log('IS LOADED', map)), { immediate: true });
    watch(() => map.isMounted, (v: boolean) => (console.log('IS MOUNTED', v)), { immediate: true });

    onMounted(() => {
      setTimeout(() => (markerCoordinates.value = [ 13.377507, 42.516267 ]), 5000);
    });

    function onLoad(e: MglEvent) {
      loaded.value++;
      mapVersion.value = e.map.version;
      console.log(e.type, e, e.map.version);
    }

    return {
      showCustomControl, loaded, map, mapVersion, markerCoordinates, onLoad,
      isZooming                 : ref(false),
      controlPosition           : ref(Position.TOP_LEFT),
      showMap                   : ref(true),
      center                    : [ -122.483696, 37.833818 ] as LngLatLike,
      zoom                      : 15,
      buttonIcon                : mdiCursorDefaultClick,
    };
  }
});
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
