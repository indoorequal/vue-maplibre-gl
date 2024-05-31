import {
  createCommentVNode,
  defineComponent,
  inject,
  isRef,
  type PropType,
  provide,
  type SlotsType,
  watch,
} from "vue";
import {
  componentIdSymbol,
  sourceIdSymbol,
  sourceLayerRegistry,
  SourceOptionProps,
} from "@/lib/types";
import type { CanvasSource, Coordinates } from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

/**
 * See [CanvasSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/CanvasSource/)
 */
export default defineComponent({
  name: "MglCanvasSource",
  props: {
    sourceId: {
      type: String as PropType<string>,
      required: true,
    },
    coordinates: Array as unknown as PropType<Coordinates>,
    animate: Boolean as PropType<boolean>,
    canvas: [Object, String] as PropType<HTMLCanvasElement | string>,
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<CanvasSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry(),
      opts = { ...props, type: "canvas" };

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource(source, opts as SourceOptionProps, registry);

    watch(
      isRef(props.coordinates) ? props.coordinates : () => props.coordinates,
      (v) => {
        source.value?.setCoordinates(v as Coordinates);
      },
      { immediate: true },
    );

    return () => [
      createCommentVNode("Canvas Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
