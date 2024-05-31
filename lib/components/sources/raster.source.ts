import {
  createCommentVNode,
  defineComponent,
  inject,
  type PropType,
  provide,
  type SlotsType,
} from "vue";
import {
  SourceOptionProps,
  componentIdSymbol,
  sourceIdSymbol,
  sourceLayerRegistry,
} from "@/lib/types";
import type { RasterTileSource } from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

/**
 * See [RasterTileSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterTileSource/)
 */
export default defineComponent({
  name: "MglRasterSource",
  props: {
    sourceId: {
      type: String as PropType<string>,
      required: true,
    },
    url: String as PropType<string>,
    tiles: Array as PropType<string[]>,
    bounds: Array as PropType<number[]>,
    minzoom: Number as PropType<number>,
    maxzoom: Number as PropType<number>,
    tileSize: Number as PropType<number>,
    scheme: String as PropType<"xyz" | "tms">,
    attribution: String as PropType<string>,
    volatile: Boolean as PropType<boolean>,
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<RasterTileSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry(),
      opts = { ...props, type: "raster" };

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource(source, opts as SourceOptionProps, registry);

    return () => [
      createCommentVNode("Raster Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
