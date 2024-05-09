import { defineComponent, nextTick, onBeforeUnmount, type PropType } from "vue";
import { FullscreenControl } from "maplibre-gl";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";

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
    const { control, map } = useControl(() => {
      return new FullscreenControl({
        container: props.container || undefined,
      });
    }, props);

    // fire map.resize just a 2nd time
    function triggerResize() {
      nextTick(() => map.value?.resize());
    }

    control.value.on("fullscreenstart", triggerResize);
    control.value.on("fullscreenend", triggerResize);

    onBeforeUnmount(() => {
      control.value.off("fullscreenstart", triggerResize);
      control.value.off("fullscreenend", triggerResize);
    });
  },
  render() {
    return null;
  },
});
