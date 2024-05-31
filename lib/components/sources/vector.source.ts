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
import type { PromoteIdSpecification, VectorTileSource } from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

/**
 * See [VectorTileSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/VectorTileSource/)
 */
export default defineComponent({
  name: "MglVectorSource",
  props: {
    sourceId: {
      type: String as PropType<string>,
      required: true,
    },
    url: String as PropType<string>,
    tiles: Array as PropType<string[]>,
    bounds: {
      type: Array as PropType<number[]>,
      validator: function (v: number[]) {
        return v.length === 4;
      },
    },
    scheme: String as PropType<"xyz" | "tms">,
    minzoom: Number as PropType<number>,
    maxzoom: Number as PropType<number>,
    attribution: String as PropType<string>,
    promoteId: [Object, String] as PropType<PromoteIdSpecification>,
    volatile: Boolean as PropType<boolean>,
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<VectorTileSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry(),
      opts = { ...props, type: "vector" };

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource(source, opts as SourceOptionProps, registry);

    watch(
      isRef(props.tiles) ? props.tiles : () => props.tiles,
      (v) => {
        source.value?.setTiles((v as string[]) || []);
      },
      { immediate: true },
    );
    watch(
      isRef(props.url) ? props.url : () => props.url,
      (v) => {
        source.value?.setUrl((v as string) || "");
      },
      { immediate: true },
    );

    return () => [
      createCommentVNode("Vector Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
