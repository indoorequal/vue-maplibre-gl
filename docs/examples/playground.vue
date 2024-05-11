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
      <mgl-custom-control v-if="showCustomControl" :position="controlPosition" :no-classes="!useClasses">
        <button class="maplibregl-ctrl-icon" style="color: deepskyblue">
          <svg><path :d="buttonIcon" fill="currentColor" /></svg>
        </button>
      </mgl-custom-control>
      <mgl-marker :coordinates="markerCoordinates" color="#cc0000" :scale="0.5"/>

      <mgl-geo-json-source source-id="geojson" :data="geojsonSource.data as any">
	<mgl-line-layer
	  v-if="geojsonSource.show"
	  layer-id="geojson"
	  :layout="layout"
	  :paint="paint"
	  @mouseenter="onMouseenter"
	  />
      </mgl-geo-json-source>

      <mgl-vector-source source-id="libraries" :tiles="librariesSourceTiles">
	<mgl-circle-layer layer-id="libraries" source-layer="libraries" :paint="librariesLayerCirclesPaint"/>
      </mgl-vector-source>

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
    <input type="checkbox" v-model="useClasses" id="noclasses">
    <label for="noclasses">Use Custom Control Classes</label>
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
  MglGeoJsonSource,
  MglLineLayer,
  MglVectorSource,
  MglCircleLayer
} from '@indoorequal/vue-maplibre-gl';
import { mdiCursorDefaultClick } from '@mdi/js';
import { CircleLayerSpecification, LineLayerSpecification, LngLatLike, MapLayerMouseEvent } from 'maplibre-gl';
import { FeatureCollection, LineString } from 'geojson';

MglDefaults.style = 'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh';
console.log('MglDefaults', MglDefaults);

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

export default defineComponent({
  name      : 'App',
  components: {
    MglCircleLayer, MglVectorSource, MglLineLayer, MglGeoJsonSource, MglMarker, MglCustomControl,
    MglGeolocateControl, MglScaleControl, MglNavigationControl, MglAttributionControl, MglFullscreenControl, MglMap
  },
  setup() {

    const map               = useMap(),
    mapVersion        = ref<string>(),
    showCustomControl = ref(true),
    loaded            = ref(0),
    markerCoordinates = ref<LngLatLike>([ 13.377507, 52.516267 ]),
    geojsonSource     = {
      data: ref<FeatureCollection<LineString>>({
	type    : 'FeatureCollection',
	features: [
	  {
	    type      : 'Feature',
	    properties: {},
	    geometry  : {
	      type       : 'LineString',
	      coordinates: [
		[ -122.483696, 37.833818 ],
		[ -122.483482, 37.833174 ]
	      ]
	    }
	  }
	]
      }),
      show: ref(true)
    };

    watch(() => map.isLoaded, () => (console.log('IS LOADED', map)), { immediate: true });
    watch(() => map.isMounted, (v: boolean) => (console.log('IS MOUNTED', v)), { immediate: true });

    onMounted(() => {
      setTimeout(() => (markerCoordinates.value = [ 13.377507, 42.516267 ]), 5000);
      setInterval(() => {
	if (geojsonSource.data.value.features[ 0 ].geometry.coordinates.length >= lineString.length) {
	  geojsonSource.data.value = <FeatureCollection<LineString>>{
	    type    : 'FeatureCollection',
	    features: [
	      {
		type      : 'Feature',
		properties: {},
		geometry  : {
		  type       : 'LineString',
		  coordinates: [
		    [ -122.483696, 37.833818 ],
		    [ -122.483482, 37.833174 ]
		  ]
		}
	      }
	    ]
	  };
	} else {
	  geojsonSource.data.value = <FeatureCollection<LineString>>{
	    type    : 'FeatureCollection',
	    features: [
	      {
		type      : 'Feature',
		properties: {},
		geometry  : {
		  type       : 'LineString',
		  coordinates: [
		    ...geojsonSource.data.value.features[ 0 ].geometry.coordinates,
		    lineString[ geojsonSource.data.value.features[ 0 ].geometry.coordinates.length ]
		  ]
		}
	      }
	    ]
	  };
	}
      }, 1000);
    });

    function onLoad(e: MglEvent) {
      loaded.value++;
      mapVersion.value = e.map.version;
      console.log(e.type, e, e.map.version);
    }

    function onMouseenter(e: MapLayerMouseEvent) {
      console.log('EVENT', e.type, e.lngLat);
    }

    return {
      showCustomControl, loaded, map, mapVersion, markerCoordinates, geojsonSource, onLoad, onMouseenter,
      geojsonSourceData         : geojsonSource.data,
      isZooming                 : ref(false),
      controlPosition           : ref(Position.TOP_LEFT),
      showMap                   : ref(true),
      center                    : [ 10.288107, 49.405078 ] as LngLatLike,
      zoom                      : 3,
      useClasses                : ref(true),
      buttonIcon                : mdiCursorDefaultClick,
      layout                    : {
	'line-join': 'round',
	'line-cap' : 'round'
      } as LineLayerSpecification['layout'],
      paint                     : {
	'line-color': '#FF0000',
	'line-width': 8
      } as LineLayerSpecification['paint'],
      librariesSourceTiles      : [ 'https://api.librarydata.uk/libraries/{z}/{x}/{y}.mvt' ],
      librariesLayerCirclesPaint: {
	'circle-radius': 5,
	'circle-color' : '#1b5e20'
      } as CircleLayerSpecification['paint']
    };
  }
});
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
