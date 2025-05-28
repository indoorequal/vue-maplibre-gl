import type {
  CircleLayerSpecification,
  FillExtrusionLayerSpecification,
  FillLayerSpecification,
  HeatmapLayerSpecification,
  HillshadeLayerSpecification,
  LineLayerSpecification,
  RasterLayerSpecification,
  SymbolLayerSpecification,
  Map,
  MapLayerEventType,
  BackgroundLayerSpecification,
} from "maplibre-gl";
import { type PropType, type VNode } from "vue";

export type LayersWithSource =
  | FillLayerSpecification
  | LineLayerSpecification
  | SymbolLayerSpecification
  | CircleLayerSpecification
  | HeatmapLayerSpecification
  | FillExtrusionLayerSpecification
  | RasterLayerSpecification
  | HillshadeLayerSpecification;

export type LayersWithoutSource = BackgroundLayerSpecification;

export type AddedProperties = {
  layerId: string;
  sourceLayer?: string;
  source?: string;
  before?: string;
}

export type LayerProps<T extends LayersWithSource> = AddedProperties & Omit<T, "source" | "source-layer" | "id" | "type">

export type LayerEventType = keyof MapLayerEventType

export const LAYER_EVENTS: Array<LayerEventType> = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "contextmenu",
  "touchstart",
  "touchend",
  "touchcancel",
] as const;

export type LayerPropTypeNaive<T extends LayersWithSource> = {
  [K in keyof LayerProps<T>]: { type: PropType<LayerProps<T>[K]>, required?: boolean | undefined }
}

export type LayerPropTypeAdded<T extends LayersWithSource> = {
  layerId: { type: PropType<T['id']> },
  sourceLayer: { type: PropType<T['source-layer']> },
  before: { type: PropType<string> },
  source: { type: PropType<T['source']> }
}

export type LayerPropType<T extends LayersWithSource> = LayerPropTypeNaive<T> & LayerPropTypeAdded<T>

export function layerProps<
  T extends LayersWithSource,
>() {
  return {
    /**
     * The id of the layer
     */
    layerId: {
      type: String as PropType<T['id']>,
      required: true,
    },
    source: {
      type: String as PropType<T['source']>
    },
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: {
      type: [Object, Array, String, Number] as PropType<T['metadata']>
    },
    /**
     * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
     */
    sourceLayer: { type: String as PropType<T['source-layer']> },
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: { type: Number as PropType<T['minzoom']> },
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: { type: Number as PropType<T['maxzoom']> },
    /**
     * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
     */
    filter: { type: Object as PropType<T['filter']> },
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: { type: String as PropType<string> },
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    layout: { type: Object as PropType<T["layout"]> },
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    paint: { type: Object as PropType<T["paint"]> },
  };
}

export function genLayerOpts<T extends LayersWithSource>(
  id: string,
  type: string,
  props: LayerProps<T>,
  source: string | undefined,
): T {
  const opts = {
    id,
    type,
    source: props.source || source,
    metadata: props.metadata,
    minzoom: props.minzoom,
    maxzoom: props.maxzoom,
    "source-layer": props.sourceLayer,
    filter: props.filter,
    paint: props.paint,
    layout: props.layout,
  } as T;
  for (const opt of Object.keys(opts) as Array<keyof T>) {
    if (opts[opt] === undefined) {
      delete opts[opt];
    }
  }
  return opts;
}

export function registerLayerEvents(map: Map, layerId: string, vn: VNode) {
  if (!vn.props) {
    return;
  }

  for (const eventName of LAYER_EVENTS) {
    const evProp =
      "on" + eventName.charAt(0).toUpperCase() + eventName.substr(1);
    if (vn.props[evProp]) {
      map.on(eventName, layerId, vn.props[evProp]);
    }
  }
}

export function unregisterLayerEvents(map: Map, layerId: string, vn: VNode) {
  if (!vn.props) {
    return;
  }

  for (const eventName of LAYER_EVENTS) {
    const evProp =
      "on" + eventName.charAt(0).toUpperCase() + eventName.substr(1);
    if (vn.props[evProp]) {
      map.off(eventName, layerId, vn.props[evProp]);
    }
  }
}
