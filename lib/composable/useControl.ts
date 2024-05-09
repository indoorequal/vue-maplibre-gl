import { inject, shallowRef, onBeforeUnmount, type ShallowRef } from "vue";
import type { Map, IControl, ControlPosition } from "maplibre-gl";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

type ControlProps = {
  position?: ControlPosition;
};

/**
 * Add a control to the map, with position watcher
 */
export function useControl<T extends IControl>(
  fun: () => T,
  props: ControlProps,
): { control: ShallowRef<T>; map: ShallowRef<Map | undefined> } {
  const map = inject(mapSymbol)!;
  const isInitialized = inject(isInitializedSymbol)!;
  const control = shallowRef();

  control.value = fun();

  usePositionWatcher(() => props.position, map, control.value);

  onBeforeUnmount(
    () => isInitialized.value && map.value?.removeControl(control.value),
  );

  return { control, map };
}
