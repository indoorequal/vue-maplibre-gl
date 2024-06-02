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
import type { GeoJSONSource, PromoteIdSpecification } from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

type DataType = GeoJSON.GeoJSON | string;

/**
 * See [GeoJSONSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/)
 */
export default defineComponent({
  name: "MglGeoJsonSource",
  props: {
    sourceId: {
      type: String as PropType<string>,
      required: true,
    },
    data: {
      type: [Object, String] as PropType<DataType>,
      required: true,
    },
    maxzoom: Number as PropType<number>,
    attribution: String as PropType<string>,
    buffer: Number as PropType<number>,
    tolerance: Number as PropType<number>,
    cluster: Boolean as PropType<boolean>,
    clusterRadius: Number as PropType<number>,
    clusterMaxZoom: Number as PropType<number>,
    clusterMinPoints: Number as PropType<number>,
    clusterProperties: Object as PropType<unknown>,
    lineMetrics: Boolean as PropType<boolean>,
    generateId: Boolean as PropType<boolean>,
    promoteId: [Object, String] as PropType<PromoteIdSpecification>,
    filter: [Array, String, Object] as PropType<unknown>,
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<GeoJSONSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry(),
      opts = { ...props, type: "geojson" };

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource(source, opts as SourceOptionProps, registry);

    watch(
      isRef(props.data) ? props.data : () => props.data,
      (v) => {
        source.value?.setData(
          (v as DataType) || { type: "FeatureCollection", features: [] },
        );
      },
      { immediate: true },
    );

    return () => [
      createCommentVNode("GeoJSON Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
