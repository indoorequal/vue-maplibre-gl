import { defineComponent, type PropType } from "vue";
import { NavigationControl, type ControlPosition } from "maplibre-gl";
import {
  Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";

/**
 * Render Navigation Control
 *
 * See [NavigationControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/)
 */
export default defineComponent({
  name: "MglNavigationControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
      type: String as PropType<ControlPosition>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    /**
     * If true the compass button is included.
     */
    showCompass: { type: Boolean as PropType<boolean>, default: true },
    /**
     * If true the zoom-in and zoom-out buttons are included.
     */
    showZoom: { type: Boolean as PropType<boolean>, default: true },
    /**
     * If true the pitch is visualized by rotating X-axis of compass.
     */
    visualizePitch: Boolean as PropType<boolean>,
  },
  setup(props) {
    useControl(() => {
      return new NavigationControl({
        showCompass: props.showCompass,
        showZoom: props.showZoom,
        visualizePitch: props.visualizePitch,
      });
    }, props);
  },
  render() {
    return null;
  },
});
