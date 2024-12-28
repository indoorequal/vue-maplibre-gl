// Deck Line Layer
//
// A Deck.gl Line Layer Example.
<template>
  <MglMap
    :map-style="mapStyle"
    :center
    :zoom
    :maxZoom
    :pitch
    :bearing
    height="500px"
  >
    <MglDeckScatteredPlotLayer
      id="airports"
      :data="airports"
      :radiusScale="20"
      :getPosition="(d) => d.coordinates"
      :getFillColor="[255, 140, 0]"
      :getRadius="
        (d) => {
          if (d.type.search('major') >= 0) {
            return 100;
          }
          if (d.type.search('small') >= 0) {
            return 30;
          }
          return 60;
        }
      "
      :pickable="true"
      :getTooltip="getTooltip"
    />
    <MglDeckLineLayer
      id="flight-paths"
      :data="flightPaths"
      :opacity="0.9"
      :getSourcePosition="(d) => d.start"
      :getTargetPosition="(d) => d.end"
      :getColor="
        (d) => {
          const z = d.start[2];
          const r = z / 10000;
          return [255 * (1 - r * 2), 128 * r, 255 * r, 255 * (1 - r)];
        }
      "
      :getWidth="lineWidth"
      :pickable="true"
      :getTooltip="getTooltip"
    />
  </MglMap>
</template>

<script setup lang="ts">
import { MapViewState, PickingInfo } from "@deck.gl/core";
import {
  MglMap,
  MglDeckScatteredPlotLayer,
  MglDeckLineLayer,
} from "@indoorequal/vue-maplibre-gl";

// Source data CSV
const DATA_URL = {
  AIRPORTS:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/airports.json",
  FLIGHT_PATHS:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/heathrow-flights.json",
};

type Airport = {
  type: "major" | "mid" | "small";
  name: string;
  abbrev: string; // airport code
  coordinates: [longitude: number, latitude: number];
};

type FlightPath = {
  start: [longitude: number, latitude: number, altitude: number];
  end: [longitude: number, latitude: number, altitude: number];
  country: string;
  name: string; // tail number
};

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 47.65,
  longitude: 7,
  zoom: 4.5,
  maxZoom: 16,
  pitch: 50,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

function getTooltip({ object }: PickingInfo) {
  return (
    object &&
    `\
  ${(object as FlightPath).country || (object as Airport).abbrev || ""}
  ${object.name.indexOf("0x") >= 0 ? "" : object.name}`
  );
}

const airports = DATA_URL.AIRPORTS;
const flightPaths = DATA_URL.FLIGHT_PATHS;
const lineWidth = 3;

const mapStyle = MAP_STYLE;
const center = [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude];
const zoom = INITIAL_VIEW_STATE.zoom;
const maxZoom = INITIAL_VIEW_STATE.maxZoom;
const pitch = INITIAL_VIEW_STATE.pitch;
const bearing = INITIAL_VIEW_STATE.bearing;
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
