import { type LngLatLike, LngLat } from "maplibre-gl";

export function isLngLatEqual(one: LngLatLike, two: LngLatLike): boolean {
  const firstPosition = LngLat.convert(one);
  const secondPosition = LngLat.convert(two);

  return (
    firstPosition.lng === secondPosition.lng &&
    firstPosition.lat === secondPosition.lat
  );
}
