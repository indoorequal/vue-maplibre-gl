import {
  createCommentVNode,
  defineComponent,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  type PropType,
  ref,
  Ref,
  type SlotsType,
  Teleport,
  watch,
} from "vue";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import type { ControlPosition, IControl } from "maplibre-gl";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

export class CustomControl implements IControl {
  public static readonly CONTROL_CLASS = "maplibregl-ctrl";
  public static readonly CONTROL_GROUP_CLASS = "maplibregl-ctrl-group";

  public readonly container: HTMLDivElement;

  constructor(
    private isAdded: Ref<boolean>,
    noClasses: boolean,
  ) {
    this.container = document.createElement("div");
    this.setClasses(noClasses);
  }

  getDefaultPosition(): ControlPosition {
    return Position.TOP_LEFT;
  }

  onAdd(): HTMLElement {
    nextTick(() => (this.isAdded.value = true));
    return this.container;
  }

  onRemove(): void {
    this.isAdded.value = false;
    this.container.remove();
  }

  setClasses(noClasses: boolean) {
    if (noClasses) {
      this.container.classList.remove(CustomControl.CONTROL_CLASS);
      this.container.classList.remove(CustomControl.CONTROL_GROUP_CLASS);
    } else {
      this.container.classList.add(CustomControl.CONTROL_CLASS);
      this.container.classList.add(CustomControl.CONTROL_GROUP_CLASS);
    }
  }
}

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
