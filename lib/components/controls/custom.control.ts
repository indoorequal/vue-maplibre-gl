import {
  createCommentVNode,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
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
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";
import { CustomControl } from "@/lib/components/controls/custom";

export default /*#__PURE__*/ defineComponent({
  name: "MglCustomControl",
  props: {
    position: {
      type: String as PropType<PositionProp>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    noClasses: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  slots: Object as SlotsType<{ default: {} }>,
  setup(props, { slots }) {
    const map = inject(mapSymbol)!,
      isInitialized = inject(isInitializedSymbol)!,
      isAdded = ref(false),
      control = new CustomControl(isAdded, props.noClasses!);

    usePositionWatcher(() => props.position, map, control);
    watch(
      () => props.noClasses,
      (v) => control.setClasses(v!),
    );
    onBeforeUnmount(
      () => isInitialized.value && map.value?.removeControl(control),
    );

    return () => {
      if (!isAdded.value) {
        return createCommentVNode("custom-component");
      }
      return h(Teleport as any, { to: control.container }, slots.default?.({}));
    };
  },
});
