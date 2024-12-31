import type {
  ArcLayerProps,
  GeoJsonLayerProps,
  BitmapLayerProps,
  ColumnLayerProps,
  LineLayerProps,
  PolygonLayerProps,
  ScatterplotLayerProps,
  PathLayerProps,
  IconLayerProps,
  ArcLayer,
  ColumnLayer,
  GeoJsonLayer,
  BitmapLayer,
  LineLayer,
  PolygonLayer,
  ScatterplotLayer,
  PathLayer,
  IconLayer,
} from "@deck.gl/layers";

import { type ComponentPropsOptions, type PropType } from "vue";
import {
  COORDINATE_SYSTEM,
  LayerExtension,
  type PickingInfo,
  type Color,
  type Unit,
  type Position,
  type LayerProps,
  type LayerData,
  type Accessor,
  type Material, AccessorFunction
} from "@deck.gl/core";
import type { MjolnirEvent } from "mjolnir.js";
import type { Feature, Geometry, Polygon } from "geojson";

export type DeckLayer =
  | ArcLayer
  | GeoJsonLayer
  | BitmapLayer
  | ColumnLayer
  | LineLayer
  | PolygonLayer
  | ScatterplotLayer
  | PathLayer
  | IconLayer;

export type DeckLayerProps =
  | ArcLayerProps
  | GeoJsonLayerProps
  | BitmapLayerProps
  | ColumnLayerProps
  | LineLayerProps
  | PolygonLayerProps
  | ScatterplotLayerProps
  | PathLayerProps
  | IconLayerProps;

export type PointType =
  | "circle"
  | "icon"
  | "text"
  | "circle+icon"
  | "circle+text"
  | "icon+text"
  | "icon+circle"
  | "text+circle"
  | "text+icon";

export type TooltipContent =
  | null
  | string
  | {
      text?: string;
      html?: string;
      className?: string;
      style?: Partial<CSSStyleDeclaration>;
    };

export const baseLayerProps: ComponentPropsOptions = {
  // basic props
  id: {
    type: String as PropType<string>,
    required: true,
  },
  data: {
    type: [Object, String] as PropType<unknown>,
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  opacity: {
    type: Number as PropType<number>,
    default: 1,
  },
  extensions: {
    type: Array as PropType<LayerExtension[]>,
  },
  onError: {
    type: Function as unknown as PropType<
      ((error: Error) => boolean | void) | null
    >,
    default: undefined,
  },

  // Interaction Properties
  pickable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  onHover: {
    type: Function as unknown as PropType<
      ((pickingInfo: PickingInfo, event: MjolnirEvent) => boolean | void) | null
    >,
    default: undefined,
  },
  onClick: {
    type: Function as unknown as PropType<
      ((pickingInfo: PickingInfo, event: MjolnirEvent) => boolean | void) | null
    >,
    default: undefined,
  },
  onDragStart: {
    type: Function as unknown as PropType<
      ((pickingInfo: PickingInfo, event: MjolnirEvent) => boolean | void) | null
    >,
    default: undefined,
  },
  onDrag: {
    type: Function as unknown as PropType<
      ((pickingInfo: PickingInfo, event: MjolnirEvent) => boolean | void) | null
    >,
    default: undefined,
  },
  onDragEnd: {
    type: Function as unknown as PropType<
      ((pickingInfo: PickingInfo, event: MjolnirEvent) => boolean | void) | null
    >,
    default: undefined,
  },
  highlightColor: {
    type: [Array, Function] as unknown as PropType<
      Color | ((pickingInfo: PickingInfo) => void)
    >,
    default: () => [0, 0, 128, 128],
  },
  highlightedObjectIndex: {
    type: [Number, null],
    default: null,
  },
  autoHighlight: {
    type: Boolean,
    default: false,
  },

  // Coordinate System Properties
  coordinateSystem: {
    type: Number,
    default: COORDINATE_SYSTEM.DEFAULT,
  },
  coordinateOrigin: {
    type: Array as unknown as PropType<[number, number, number]>,
    default: () => [0, 0, 0],
  },
  wrapLongitude: {
    type: Boolean,
    default: false,
  },
  modelMatrix: {
    type: Array as PropType<number[]>,
    default: undefined,
  },

  // data properties
  dataComparator: {
    type: Function as unknown as PropType<
      | (<LayerDataT = LayerData<unknown>>(
          newData: LayerDataT,
          oldData?: LayerDataT,
        ) => boolean)
      | null
    >,
  },
  _dataDiff: {
    type: Function as unknown as PropType<
      | (<LayerDataT = LayerData<unknown>>(
          newData: LayerDataT,
          oldData?: LayerDataT,
        ) => { startRow: number; endRow?: number }[])
      | null
    >,
  },
  dataTransform: {
    type: Function as unknown as PropType<
      | (<LayerDataT = LayerData<unknown>>(
          data: unknown,
          previousData?: LayerDataT,
        ) => LayerDataT)
      | null
    >,
    default: undefined,
  },
  positionFormat: {
    type: String as PropType<"XYZ" | "XY">,
    default: "XYZ",
  },
  colorFormat: {
    type: String as PropType<"RGBA" | "RGB">,
    default: "RGBA",
  },
  numInstances: {
    type: Number as PropType<number | null>,
    default: undefined,
  },
  updateTrigger: {
    type: Object as PropType<Record<string, unknown>>,
  },

  // custom tooltip prop
  getTooltip: {
    type: Function as unknown as PropType<
      ((info: PickingInfo) => TooltipContent) | null
    >,
  },
};
export const baseLayerKeys: (keyof LayerProps)[] = [
  "id",
  "data",
  "visible",
  "opacity",
  "extensions",
  "onError",
  "pickable",
  "onHover",
  "onClick",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "highlightColor",
  "highlightedObjectIndex",
  "autoHighlight",
  "coordinateSystem",
  "coordinateOrigin",
  "wrapLongitude",
  "modelMatrix",
  "dataComparator",
  "_dataDiff",
  "dataTransform",
  "positionFormat",
  "colorFormat",
  "numInstances",
];

export function arcProps(): ComponentPropsOptions {
  return {
    ...baseLayerProps,
    greatCircle: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    numSegments: {
      type: Number as PropType<number>,
      default: 50,
    },
    widthUnits: {
      type: String as PropType<Unit>,
      default: "pixels",
    },
    widthScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    widthMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    widthMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    getSourcePosition: {
      type: Function as unknown as PropType<Accessor<unknown, Position>>,
      default: (object: { sourcePosition: Position }) => object.sourcePosition,
    },
    getTargetPosition: {
      type: Function as unknown as PropType<Accessor<unknown, Position>>,
      default: (object: { targetPosition: Position }) => object.targetPosition,
    },
    getSourceColor: {
      type: Function as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getTargetColor: {
      type: Function as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getWidth: {
      type: Number as PropType<Accessor<unknown, number>>,
      default: 1,
    },
    getHeight: {
      type: Number as PropType<Accessor<unknown, number>>,
      default: 1,
    },
    getTilt: {
      type: Number as PropType<Accessor<unknown, number>>,
      default: 0,
    },
  };
}
export const arcPropsKeys: (keyof ArcLayerProps)[] = [
  ...baseLayerKeys,
  "greatCircle",
  "numSegments",
  "widthUnits",
  "widthScale",
  "widthMinPixels",
  "widthMaxPixels",
  "getSourcePosition",
  "getTargetPosition",
  "getSourceColor",
  "getTargetColor",
  "getWidth",
  "getHeight",
  "getTilt",
];

export function geojsonProps(): ComponentPropsOptions {
  return {
    ...baseLayerProps,
    pointType: {
      type: String as PropType<PointType>,
      default: "circle",
    },
    // fill color props
    filled: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    getFillColor: {
      type: [Array, Function] as unknown as PropType<
        Accessor<Feature<Geometry, unknown>, Color>
      >,
      default: () => [0, 0, 0, 255],
    },
    // stroke options
    stroked: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    getLineColor: {
      type: [Array, Function] as unknown as PropType<
        Accessor<Feature<Geometry, unknown>, Color>
      >,
      default: () => [0, 0, 0, 255],
    },
    getLineWidth: {
      type: [Number, Function] as PropType<
        Accessor<Feature<Geometry, unknown>, number>
      >,
      default: 1,
    },
    lineWidthUnits: {
      type: String as PropType<Unit>,
      default: "meters",
    },
    lineWidthScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    lineWidthMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    lineWidthMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    lineCapRounded: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    lineJointRounded: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    lineMiterLimit: {
      type: Number as PropType<number>,
      default: 4,
    },
    lineBillboard: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 3D options
    extruded: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    wireframe: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    getElevation: {
      type: [Number, Function] as PropType<
        Accessor<Feature<Geometry, unknown>, number>
      >,
      default: 1000,
    },
    elevationScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    material: {
      type: [Boolean, Object] as PropType<Material>,
      default: true,
    },
    _full3d: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    getPointRadius: {
      type: [Number, Function] as PropType<
        Accessor<Feature<Geometry, unknown>, number>
      >,
      default: 1,
    },
    pointRadiusUnits: {
      type: String as PropType<Unit>,
    },
    pointRadiusScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    pointRadiusMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    pointRadiusMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    pointAntialiasing: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    pointBillboard: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    getText: {
      type: Function as PropType<Accessor<Feature<Geometry, unknown>, unknown>>,
      default: (f: { properties: { text: unknown } }) => f.properties.text,
    },
    getTextColor: {
      type: [Array, Function] as unknown as PropType<
        Accessor<Feature<Geometry, unknown>, Color>
      >,
      default: () => [0, 0, 0, 255],
    },
    getTextAngle: {
      type: Number as PropType<Accessor<Feature<Geometry, unknown>, number>>,
      default: 0,
    },

    getTextSize: {
      type: Number as PropType<Accessor<Feature<Geometry, unknown>, number>>,
      default: 32,
    },
    getTextAnchor: {
      type: String as PropType<Accessor<Feature<Geometry, unknown>, string>>,
      default: "middle",
    },
    getTextAlignmentBaseline: {
      type: String as PropType<Accessor<Feature<Geometry, unknown>, string>>,
      default: "center",
    },
    getTextPixelOffset: {
      type: [Array, Function] as PropType<
        Accessor<Feature<Geometry, unknown>, number[]>
      >,
      default: () => [0, 0],
    },
    getTextBackgroundColor: {
      type: [Array, Function] as unknown as PropType<
        Accessor<Feature<Geometry, unknown>, Color>
      >,
      default: () => [255, 255, 255, 255],
    },
    getTextBorderColor: {
      type: [Array, Function] as unknown as PropType<
        Accessor<Feature<Geometry, unknown>, Color>
      >,
      default: () => [0, 0, 0, 255],
    },
    getTextBorderWidth: {
      type: Number as PropType<Accessor<Feature<Geometry, unknown>, number>>,
      default: 0,
    },
    textSizeUnits: {
      type: String as PropType<Unit>,
      default: "pixels",
    },
    textSizeScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    textSizeMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    textSizeMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    textCharacterSet: {
      type: [String, Array] as PropType<unknown>,
    },
    textFontFamily: {
      type: String as PropType<string>,
      default: "Monaco, monospace",
    },
    textFontWeight: {
      type: [Number, String] as PropType<number | string>,
      default: "normal",
    },
    textLineHeight: {
      type: Number as PropType<number>,
      default: 1,
    },
    textMaxWidth: {
      type: Number as PropType<number>,
      default: -1,
    },
    textWordBreak: {
      type: String as PropType<string>,
      default: "break-word",
    },
    textBackground: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    textBackgroundPadding: {
      type: Array as PropType<number[]>,
      default: () => [0, 0],
    },
    textOutlineColor: {
      type: Array as unknown as PropType<Color>,
      default: () => [0, 0, 0, 255],
    },
    textOutlineWidth: {
      type: Number as PropType<number>,
      default: 0,
    },
    textBillboard: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    textFontSettings: {
      type: Object,
    },
  };
}
export const geoJsonPropsKeys: (keyof GeoJsonLayerProps)[] = [
  ...baseLayerKeys,
  "pointType",
  "filled",
  "getFillColor",
  "stroked",
  "getLineColor",
  "getLineWidth",
  "lineWidthUnits",
  "lineWidthScale",
  "lineWidthMinPixels",
  "lineWidthMaxPixels",
  "lineCapRounded",
  "lineJointRounded",
  "lineMiterLimit",
  "lineBillboard",
  "extruded",
  "wireframe",
  "getElevation",
  "elevationScale",
  "material",
  "_full3d",
  "getPointRadius",
  "pointRadiusUnits",
  "pointRadiusScale",
  "pointRadiusMinPixels",
  "pointRadiusMaxPixels",
  "pointAntialiasing",
  "pointBillboard",
  "getText",
  "getTextColor",
  "getTextAngle",
  "getTextSize",
  "getTextAnchor",
  "getTextAlignmentBaseline",
  "getTextPixelOffset",
  "getTextBackgroundColor",
  "getTextBorderColor",
  "getTextBorderWidth",
  "textSizeUnits",
  "textSizeScale",
  "textSizeMinPixels",
  "textSizeMaxPixels",
  "textCharacterSet",
  "textFontFamily",
  "textFontWeight",
  "textLineHeight",
  "textMaxWidth",
  "textWordBreak",
  "textBackground",
  "textBackgroundPadding",
  "textOutlineColor",
  "textOutlineWidth",
  "textBillboard",
  "textFontSettings",
];

export function lineProps(): ComponentPropsOptions {
  return {
    ...baseLayerProps,
    widthUnits: {
      type: String as PropType<Unit>,
      default: "pixels",
    },

    widthScale: {
      type: Number as PropType<number>,
      default: 1,
    },

    widthMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },

    widthMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    getSourcePosition: {
      type: Function as unknown as PropType<Accessor<unknown, Position>>,
      default: (object: { sourcePosition: Position }) => object.sourcePosition,
    },
    getTargetPosition: {
      type: Function as unknown as PropType<Accessor<unknown, Position>>,
      default: (object: { targetPosition: Position }) => object.targetPosition,
    },

    getColor: {
      type: [Function, Array] as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getWidth: {
      type: Number as PropType<Accessor<unknown, number>>,
      default: 1,
    },
  };
}
export const linePropsKeys: (keyof LineLayerProps)[] = [
  ...baseLayerKeys,
  "widthUnits",
  "widthScale",
  "widthMinPixels",
  "widthMaxPixels",
  "getSourcePosition",
  "getTargetPosition",
  "getColor",
  "getWidth",
];

export function scatteredPlotProps(): ComponentPropsOptions {
  return {
    ...baseLayerProps,
    radiusUnits: {
      type: String as PropType<Unit>,
      default: "meters",
    },
    radiusScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    lineWidthUnits: {
      type: String as PropType<Unit>,
      default: "meters",
    },
    lineWidthScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    filled: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    stroked: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    radiusMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    radiusMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    lineWidthMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    lineWidthMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    billboard: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    antialiasing: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    getPosition: {
      type: Function as unknown as PropType<Accessor<unknown, Position>>,
      default: (object: { position: Position }) => object.position,
    },
    getRadius: {
      type: [Number, Function] as PropType<Accessor<unknown, number>>,
      default: 1,
    },
    getColor: {
      type: [Function, Array] as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getFillColor: {
      type: [Array, Function] as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getLineColor: {
      type: [Array, Function] as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getLineWidth: {
      type: [Number, Function] as PropType<Accessor<unknown, number>>,
      default: 1,
    },
  };
}
export const scatteredPlotPropsKeys: (keyof ScatterplotLayerProps)[] = [
  ...baseLayerKeys,
  "radiusUnits",
  "radiusScale",
  "lineWidthUnits",
  "lineWidthScale",
  "filled",
  "stroked",
  "radiusMinPixels",
  "radiusMaxPixels",
  "lineWidthMinPixels",
  "lineWidthMaxPixels",
  "billboard",
  "antialiasing",
  "getPosition",
  "getRadius",
  "getColor",
  "getFillColor",
  "getLineColor",
  "getLineWidth",
];

export function polygonProps(): ComponentPropsOptions {
  return {
    ...baseLayerProps,
    filled: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    stroked: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    extruded: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    wireframe: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    elevationScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    lineWidthUnits: {
      type: String as PropType<Unit>,
      default: "meters",
    },
    lineWidthScale: {
      type: Number as PropType<number>,
      default: 1,
    },
    lineWidthMinPixels: {
      type: Number as PropType<number>,
      default: 0,
    },
    lineWidthMaxPixels: {
      type: Number as PropType<number>,
      default: Number.MAX_SAFE_INTEGER,
    },
    lineJointRounded: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    lineMiterLimit: {
      type: Number as PropType<number>,
      default: 4,
    },
    material: {
      type: [Boolean, Object] as PropType<Material>,
      default: true,
    },
    _normalize: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    _windingOrder: {
      type: String as PropType<'CW' | 'CCW'>,
      default: "CW",
    },
    getPolygon: {
      type: Function as PropType<AccessorFunction<unknown, unknown>>,
      default: (object: { polygon: Polygon }) => object.polygon,
    },
    getFillColor: {
      type: [Array, Function] as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getLineColor: {
      type: [Array, Function] as unknown as PropType<Accessor<unknown, Color>>,
      default: () => [0, 0, 0, 255],
    },
    getLineWidth: {
      type: [Number, Function] as PropType<Accessor<unknown, number>>,
      default: 1,
    },
    getElevation: {
      type: [Number, Function] as PropType<Accessor<unknown, number>>,
      default: 1000,
    }
  };
}
export const polygonPropsKeys: (keyof PolygonLayerProps)[] = [
  ...baseLayerKeys,
  'filled',
  'stroked',
  'extruded',
  'wireframe',
  'elevationScale',
  'lineWidthUnits',
  'lineWidthScale',
  'lineWidthMinPixels',
  'lineWidthMaxPixels',
  'lineJointRounded',
  'lineMiterLimit',
  'material',
  '_normalize',
  '_windingOrder',
  'getPolygon',
  'getFillColor',
  'getLineColor',
  'getLineWidth',
  'getElevation'
]

export function genDeckLayerOpts<T extends DeckLayerProps>(
  props: T & { getTooltip?: ((info: PickingInfo) => TooltipContent) | null },
  validProps: Array<keyof T>,
): Partial<T> {
  for (const opt of Object.keys(props) as Array<keyof T>) {
    if (props[opt] === undefined || !validProps.includes(opt)) {
      delete props[opt];
    }
  }

  return props;
}
