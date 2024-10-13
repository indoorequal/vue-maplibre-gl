// Custom Control
//
// A custom control with a button
<template>
  <mgl-map
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="500px"
  >
    <mgl-custom-control
      v-if="showCustomControl"
      :position="controlPosition"
    >
      <button
        class="maplibregl-ctrl-icon"
        style="color: deepskyblue"
        @click="onClick"
      >
        <svg>
          <path
            :d="mdiCursorDefaultClick"
            fill="currentColor"
            />
        </svg>
      </button>
    </mgl-custom-control>
  </mgl-map>
  <div>
    <input type="checkbox" v-model="showCustomControl" id="showcustom">
    <label for="showcustom">Show Custom Control</label>
  </div>
  <div>
    Control position:
    <br />
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
</template>

<script setup lang="ts">
import {
  MglMap,
  MglCustomControl,
  Position,
} from '@indoorequal/vue-maplibre-gl';
import { ref } from 'vue';
import { mdiCursorDefaultClick } from '@mdi/js';

const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=3YeFnghdqUJJpIvlgLti';
const center = [ -122.483696, 37.833818 ];
const zoom = 15;

const showCustomControl = ref(true);
const controlPosition = ref(Position.TOP_LEFT);

const onClick = function() {
  console.log('button clicked !')
}
</script>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
