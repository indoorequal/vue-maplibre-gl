import {
  createCommentVNode,
  defineComponent,
  inject,
  type PropType,
  provide,
  type SlotsType,
} from "vue";
import {
  componentIdSymbol,
  sourceIdSymbol,
  sourceLayerRegistry,
  SourceOptionProps,
} from "@/lib/types";
import type { RasterDEMTileSource } from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

/**
 * See [RasterDEMTileSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterDEMTileSource/)
 */
export default defineComponent({
  name: "MglRasterDemSource",
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
    attribution: String as PropType<string>,
    encoding: String as PropType<"terrarium" | "mapbox" | "custom">,
    volatile: Boolean as PropType<boolean>,
    redFactor: Number as PropType<number>,
    blueFactor: Number as PropType<number>,
    greenFactor: Number as PropType<number>,
    baseShift: Number as PropType<number>,
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<RasterDEMTileSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry(),
      opts = { ...props, type: "raster-dem" };

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource(source, opts as SourceOptionProps, registry);

    return () => [
      createCommentVNode("RasterDem Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
