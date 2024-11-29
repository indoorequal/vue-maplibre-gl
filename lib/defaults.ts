import type { LngLatLike, MapOptions } from "maplibre-gl";
import { reactive } from "vue";

export const defaults = reactive<Omit<MapOptions, "container">>({
  style: "https://demotiles.maplibre.org/style.json",
  center: Object.freeze([0, 0]) as LngLatLike,
  zoom: 1,
  trackResize: true,
});
