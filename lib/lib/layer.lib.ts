import type {
  BackgroundLayerSpecification,
  CircleLayerSpecification,
  FillExtrusionLayerSpecification,
  FillLayerSpecification,
  HeatmapLayerSpecification,
  HillshadeLayerSpecification,
  LayerSpecification,
  LineLayerSpecification,
  Map,
  MapLayerEventType,
  RasterLayerSpecification,
  Source,
  SymbolLayerSpecification,
  FilterSpecification
} from "maplibre-gl";
import { type PropType, unref, type VNode } from "vue";

export class LayerLib {
  static readonly SOURCE_OPTS: Array<
    keyof (Omit<
      FillLayerSpecification &
        LineLayerSpecification &
        SymbolLayerSpecification &
        CircleLayerSpecification &
        HeatmapLayerSpecification &
        FillExtrusionLayerSpecification &
        RasterLayerSpecification &
        HillshadeLayerSpecification &
        BackgroundLayerSpecification,
      "source-layer"
    > & {
      sourceLayer?: string;
    })
  > = [
    "metadata",
    "ref",
    "source",
    "sourceLayer",
    "minzoom",
    "maxzoom",
    "interactive",
    "filter",
    "layout",
    "paint",
  ];

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
      source: [String, Object] as PropType<string | Source>,
      metadata: [Object, Array, String, Number] as PropType<unknown>,
      sourceLayer: String as PropType<string>,
      minzoom: Number as PropType<number>,
      maxzoom: Number as PropType<number>,
      interactive: Boolean as PropType<boolean>,
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

  static genLayerOpts<T = LayerSpecification>(
    id: string,
    type: string,
    props: any,
    source: any,
  ): T {
    return Object.keys(props)
      .filter(
        (opt) =>
          (props as any)[opt] !== undefined &&
          LayerLib.SOURCE_OPTS.indexOf(opt as any) !== -1,
      )
      .reduce(
        (obj, opt) => {
          (obj as any)[opt === "sourceLayer" ? "source-layer" : opt] = unref(
            (props as any)[opt],
          );
          return obj;
        },
        { type, source: props.source || source, id } as T,
      );
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
