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

export type LayerProps = Omit<
  LayersWithSource,
  "source" | "source-layer" | "id" | "type"
> & {
  layerId: string | undefined,
  sourceLayer?: string;
  source?: string;
  before?: string;
};

export class LayerLib {
  static readonly LAYER_EVENTS: Array<keyof MapLayerEventType> = [
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
  ];

  static readonly SHARED = {
    props: {
      layerId: {
        type: String as PropType<string>,
        required: true,
      },
      source: String as PropType<string>,
      metadata: [Object, Array, String, Number] as PropType<unknown>,
      sourceLayer: String as PropType<string>,
      minzoom: Number as PropType<number>,
      maxzoom: Number as PropType<number>,
      filter: Object as PropType<FilterSpecification>,
      before: String as PropType<string>,
    },
    emits: [
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
    ],
  };

  static genLayerOpts<T extends LayersWithSource>(
    id: string,
    type: string,
    props: LayerProps,
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

  static registerLayerEvents(map: Map, layerId: string, vn: VNode) {
    if (!vn.props) {
      return;
    }

    for (let i = 0, len = LayerLib.LAYER_EVENTS.length; i < len; i++) {
      const evProp =
        "on" +
        LayerLib.LAYER_EVENTS[i].charAt(0).toUpperCase() +
        LayerLib.LAYER_EVENTS[i].substr(1);
      if (vn.props[evProp]) {
        map.on(LayerLib.LAYER_EVENTS[i], layerId, vn.props[evProp]);
      }
    }
  }

  static unregisterLayerEvents(map: Map, layerId: string, vn: VNode) {
    if (!vn.props) {
      return;
    }

    for (let i = 0, len = LayerLib.LAYER_EVENTS.length; i < len; i++) {
      const evProp =
        "on" +
        LayerLib.LAYER_EVENTS[i].charAt(0).toUpperCase() +
        LayerLib.LAYER_EVENTS[i].substr(1);
      if (vn.props[evProp]) {
        map.off(LayerLib.LAYER_EVENTS[i], layerId, vn.props[evProp]);
      }
    }
  }
}
