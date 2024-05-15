import { defineComponent, type PropType } from "vue";
import { LogoControl, type ControlPosition } from "maplibre-gl";
import {
  Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";

/**
 * Render Logo Control
 *
 * See [LogoControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/LogoControl/)
 */
export default defineComponent({
  name: "MglLogoControl",
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
     * If true, force a compact logo. If false, force the full logo. The default is a responsive logo that collapses when the map is less than 640 pixels wide.
     */
    compact: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props) {
    useControl(() => {
      return new LogoControl({
        compact: props.compact,
      });
    }, props);
  },
  render() {
    return null;
  },
});
