import { defineComponent, type PropType } from "vue";
import { ScaleControl, type ControlPosition } from "maplibre-gl";
import {
  Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";

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
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-left'.
     */
    position: {
      type: String as PropType<ControlPosition>,
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
    useControl(() => {
      return new ScaleControl({
        maxWidth: props.maxWidth,
        unit: props.unit,
      });
    }, props);
  },
  render() {
    return null;
  },
});
