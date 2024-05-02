import { defineComponent, inject, onBeforeUnmount, type PropType } from "vue";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { NavigationControl } from "maplibre-gl";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

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
      type: String as PropType<PositionProp>,
      default: Position.TOP_RIGHT,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    showCompass: { type: Boolean as PropType<boolean>, default: true },
    showZoom: { type: Boolean as PropType<boolean>, default: true },
    visualizePitch: Boolean as PropType<boolean>,
  },
  setup(props) {
    const map = inject(mapSymbol)!,
      isInitialized = inject(isInitializedSymbol)!,
      control = new NavigationControl({
        showCompass: props.showCompass,
        showZoom: props.showZoom,
        visualizePitch: props.visualizePitch,
      });

    usePositionWatcher(() => props.position, map, control);
    onBeforeUnmount(
      () => isInitialized.value && map.value?.removeControl(control),
    );
  },
  render() {
    return null;
  },
});
