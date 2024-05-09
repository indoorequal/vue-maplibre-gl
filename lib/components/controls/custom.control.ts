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

export default defineComponent({
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
  render() {
    return null;
  },
});
