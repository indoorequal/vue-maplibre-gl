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
  FilterSpecification,
  BackgroundLayerSpecification,
} from "maplibre-gl";
import { type PropType, type VNode, type ComponentPropsOptions } from "vue";

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

export type LayerProps<T extends LayersWithSource> = Omit<
  T,
  "source" | "source-layer" | "id" | "type"
> & {
  layerId?: string;
  sourceLayer?: string;
  source?: string;
  before?: string;
};

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

export function layerProps<
  T extends LayersWithSource,
>(): ComponentPropsOptions<LayerProps<T>> {
  return {
    /**
     * The id of the layer
     */
    layerId: {
      type: String as PropType<string>,
      required: true,
    },
    source: String as PropType<string>,
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: [Object, Array, String, Number] as PropType<unknown>,
    /**
     * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
     */
    sourceLayer: String as PropType<string>,
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: Number as PropType<number>,
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: Number as PropType<number>,
    /**
     * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
     */
    filter: Object as PropType<FilterSpecification>,
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: String as PropType<string>,
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    layout: Object as PropType<T["layout"]>,
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    paint: Object as PropType<T["paint"]>,
  } as ComponentPropsOptions<LayerProps<T>>;
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
