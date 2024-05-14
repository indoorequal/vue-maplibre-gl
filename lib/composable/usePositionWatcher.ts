import { type ShallowRef, type WatchSource, watch } from "vue";
import type { IControl, Map, ControlPosition } from "maplibre-gl";
import {
  type Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";

export function usePositionWatcher(
  source: WatchSource<ControlPosition | undefined>,
  map: ShallowRef<Map | undefined>,
  control: IControl,
) {
  watch(
    source,
    (v) => {
      if (v && PositionValues.indexOf(v as Position) === -1) {
        return;
      }
      if (map.value?.hasControl(control)) {
        map.value.removeControl(control);
      }
      map.value?.addControl(control, v);
    },
    { immediate: true },
  );
}
