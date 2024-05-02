import {
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  type PropType,
} from "vue";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { FullscreenControl } from "maplibre-gl";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

/**
 * Render Fullscreen Control
 *
 * See [FullscreenControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/FullscreenControl/)
 */
export default defineComponent({
  name: "MglFullscreenControl",
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
    container: {
      type: Object as PropType<HTMLElement>,
      default: null,
    },
  },
  setup(props) {
    const map = inject(mapSymbol)!,
      isInitialized = inject(isInitializedSymbol)!,
      control = new FullscreenControl({
        container: props.container || undefined,
      });

    // fire map.resize just a 2nd time
    function triggerResize() {
      nextTick(() => map.value?.resize());
    }

    control.on("fullscreenstart", triggerResize);
    control.on("fullscreenend", triggerResize);

    usePositionWatcher(() => props.position, map, control);
    onBeforeUnmount(() => {
      control.off("fullscreenstart", triggerResize);
      control.off("fullscreenend", triggerResize);
      isInitialized.value && map.value?.removeControl(control);
    });
  },
  render() {
    return null;
  },
});
