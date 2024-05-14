import { defineComponent, type PropType } from "vue";
import { AttributionControl, type ControlPosition } from "maplibre-gl";
import {
  Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";

/**
 * Render Attribution Control
 *
 * See [AttributionControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl/)
 */
export default defineComponent({
  name: "MglAttributionControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-right'.
     */
    position: {
      type: String as PropType<ControlPosition>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    /**
     * If true, the attribution control will always collapse when moving the map. If false, force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide. Attribution should not be collapsed if it can comfortably fit on the map. compact should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.
     */
    compact: Boolean as PropType<boolean>,
    /**
     * Attributions to show in addition to any other attributions.
     */
    customAttribution: [String, Array] as PropType<string | string[]>,
  },
  setup(props) {
    useControl(() => {
      return new AttributionControl({
        compact: props.compact,
        customAttribution: props.customAttribution,
      });
    }, props);
  },
  render() {
    return null;
  },
});
