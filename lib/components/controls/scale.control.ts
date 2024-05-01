import { defineComponent, inject, onBeforeUnmount, type PropType } from "vue";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { ScaleControl } from "maplibre-gl";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

export enum ScaleControlUnit {
  IMPERIAL = "imperial",
  METRIC = "metric",
  NAUTICAL = "nautical",
}

type UnitValue = ScaleControlUnit | "imperial" | "metric" | "nautical";
const UnitValues = Object.values(ScaleControlUnit);

/**
 * Render Scale Control
 *
 * See [ScaleControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScaleControl/)
 */
export default defineComponent({
  name: "MglScaleControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
      type: String as PropType<PositionProp>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    /**
     * The maximum length of the scale control in pixels. Default Value `100`
     */
    maxWidth: { type: Number as PropType<number>, default: 100 },
    /**
     * Set the scale's unit of the distance ('imperial', 'metric' or 'nautical').
     */
    unit: {
      type: String as PropType<UnitValue>,
      default: ScaleControlUnit.METRIC,
      validator: (v: ScaleControlUnit) => {
        return UnitValues.indexOf(v) !== -1;
      },
    },
  },
  setup(props) {
    const map = inject(mapSymbol)!,
      isInitialized = inject(isInitializedSymbol)!,
      control = new ScaleControl({
        maxWidth: props.maxWidth,
        unit: props.unit,
      });

    usePositionWatcher(() => props.position, map, control);
    onBeforeUnmount(
      () => isInitialized.value && map.value?.removeControl(control),
    );
  },
  render() { return null; }
});
