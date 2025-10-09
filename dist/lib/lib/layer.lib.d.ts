import { CircleLayerSpecification, FillExtrusionLayerSpecification, FillLayerSpecification, HeatmapLayerSpecification, HillshadeLayerSpecification, LineLayerSpecification, RasterLayerSpecification, SymbolLayerSpecification, Map, MapLayerEventType, BackgroundLayerSpecification } from 'maplibre-gl';
import { PropType, VNode } from 'vue';
export type LayersWithSource = FillLayerSpecification | LineLayerSpecification | SymbolLayerSpecification | CircleLayerSpecification | HeatmapLayerSpecification | FillExtrusionLayerSpecification | RasterLayerSpecification | HillshadeLayerSpecification;
export type LayersWithoutSource = BackgroundLayerSpecification;
export type AddedProperties = {
    layerId: string;
    sourceLayer?: string;
    source?: string;
    before?: string;
};
export type LayerProps<T extends LayersWithSource> = AddedProperties & Omit<T, "source" | "source-layer" | "id" | "type">;
export type LayerEventType = keyof MapLayerEventType;
export declare const LAYER_EVENTS: Array<LayerEventType>;
export type LayerPropTypeNaive<T extends LayersWithSource> = {
    [K in keyof LayerProps<T>]: {
        type: PropType<LayerProps<T>[K]>;
        required?: boolean | undefined;
    };
};
export type LayerPropTypeAdded<T extends LayersWithSource> = {
    layerId: {
        type: PropType<T['id']>;
    };
    sourceLayer: {
        type: PropType<T['source-layer']>;
    };
    before: {
        type: PropType<string>;
    };
    source: {
        type: PropType<T['source']>;
    };
};
export type LayerPropType<T extends LayersWithSource> = LayerPropTypeNaive<T> & LayerPropTypeAdded<T>;
export declare function layerProps<T extends LayersWithSource>(): {
    /**
     * The id of the layer
     */
    layerId: {
        type: PropType<T["id"]>;
        required: boolean;
    };
    source: {
        type: PropType<T["source"]>;
    };
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: {
        type: PropType<T["metadata"]>;
    };
    /**
     * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
     */
    sourceLayer: {
        type: PropType<T["source-layer"]>;
    };
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: {
        type: PropType<T["minzoom"]>;
    };
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: {
        type: PropType<T["maxzoom"]>;
    };
    /**
     * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
     */
    filter: {
        type: PropType<T["filter"]>;
    };
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: {
        type: PropType<string>;
    };
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    layout: {
        type: PropType<T["layout"]>;
    };
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    paint: {
        type: PropType<T["paint"]>;
    };
};
export declare function genLayerOpts<T extends LayersWithSource>(id: string, type: string, props: LayerProps<T>, source: string | undefined): T;
export declare function registerLayerEvents(map: Map, layerId: string, vn: VNode): void;
export declare function unregisterLayerEvents(map: Map, layerId: string, vn: VNode): void;
