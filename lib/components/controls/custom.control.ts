import {
  createCommentVNode,
  defineComponent,
  h,
  type PropType,
  ref,
  type SlotsType,
  Teleport,
  watch,
} from "vue";
import type { ControlPosition } from "maplibre-gl";
import {
  Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";
import { CustomControl } from "@/lib/components/controls/custom";

/**
 * Render a custom control with your content in the default slot
 */
export default defineComponent({
  name: "MglCustomControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-left'.
     */
    position: {
      type: String as PropType<ControlPosition>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    /**
     * Set the classes on the control div
     */
    class: {
      type: String as PropType<string>,
      default: "maplibregl-ctrl maplibregl-ctrl-group",
    },
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const isAdded = ref(false);
    const { control } = useControl(() => {
      return new CustomControl(isAdded, props.class);
    }, props);

    watch(
      () => props.class,
      () => control.value.setClasses(props.class),
    );

    return () => {
      if (!isAdded.value) {
        return createCommentVNode("custom-component");
      }
      return h(Teleport, { to: control.value.container }, slots.default?.({}));
    };
  },
  /**
   * Slot to render the content of the control
   * @slot default
   */
  render() {
    return null;
  },
});
