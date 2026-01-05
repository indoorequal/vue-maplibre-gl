window.URL.createObjectURL = (obj) => {
  return "";
};
window.TextDecoder = class {};

import { type LngLatLike, LngLat } from "maplibre-gl";
import { isLngLatEqual } from "../lib/lib/lng_lat";

const tests: [LngLatLike, LngLatLike, Boolean][] = [
  [[-122, 37], [-122, 37], true],
  [[-122, 37], new LngLat(-122, 37), true],
  [[1, 37], [-122, 37], false],
  [[-122, 1], [-122, 37], false],
  [new LngLat(-122, 37), new LngLat(-122, 37), true],
  [new LngLat(1, 37), new LngLat(-122, 37), false],
  [new LngLat(-122, 1), new LngLat(-122, 37), false],
  [{ lon: -122, lat: 37 }, { lon: -122, lat: 37 }, true],
  [{ lon: 1, lat: 37 }, { lon: -122, lat: 37 }, false],
  [{ lng: -122, lat: 37 }, { lng: -122, lat: 37 }, true],
  [{ lng: 1, lat: 37 }, { lng: -122, lat: 37 }, false],
];

tests.forEach(([one, two, expected]) => {
  test(`isLngLatEqual: ${one}/${two}`, () => {
    const result = isLngLatEqual(one, two);
    expect(result).toBe(expected);
  });
});
