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

const DEFAULT_CLASSES = "maplibregl-ctrl maplibregl-ctrl-group";

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
     * By default the control container will have the `maplibregl-ctrl` and `maplibregl-ctrl-group` classes. Set to false to remove them
     * @deprecated Use the class prop instead
     */
    noClasses: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * Set the classes on the control div
     */
    class: {
      type: String as PropType<string>,
      default: null,
    },
  },
  slots: Object as SlotsType<{ default: any }>,
  setup(props, { slots }) {
    const isAdded = ref(false);
    function getClasses() {
      if (props.class != null) {
        return props.class;
      }
      return props.noClasses ? "" : DEFAULT_CLASSES;
    }
    const { control } = useControl(() => {
      return new CustomControl(isAdded, getClasses());
    }, props);

    watch(
      () => props.noClasses,
      () => control.value.setClasses(getClasses()),
    );

    watch(
      () => props.class,
      () => control.value.setClasses(getClasses()),
    );

    return () => {
      if (!isAdded.value) {
        return createCommentVNode("custom-component");
      }
      return h(
        Teleport as any,
        { to: control.value.container },
        slots.default?.({}),
      );
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
