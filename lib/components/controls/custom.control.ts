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
import {
  Position,
  type PositionProp,
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
      type: String as PropType<PositionProp>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    /**
     * By default the control container will have the `maplibregl-ctrl` and `maplibregl-ctrl-group` classes. Set to false to remove them
     */
    noClasses: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  slots: Object as SlotsType<{ default: {} }>,
  setup(props, { slots }) {
    const isAdded = ref(false);
    const { control } = useControl(() => {
      return new CustomControl(isAdded, props.noClasses!);
    }, props);

    watch(
      () => props.noClasses,
      (v) => control.value.setClasses(v!),
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
