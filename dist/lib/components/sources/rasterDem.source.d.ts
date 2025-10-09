import { PropType, SlotsType } from 'vue';
/**
 * See [RasterDEMTileSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterDEMTileSource/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    url: PropType<string>;
    tiles: PropType<string[]>;
    bounds: PropType<number[]>;
    minzoom: PropType<number>;
    maxzoom: PropType<number>;
    tileSize: PropType<number>;
    attribution: PropType<string>;
    encoding: PropType<"terrarium" | "mapbox" | "custom">;
    volatile: PropType<boolean>;
    redFactor: PropType<number>;
    blueFactor: PropType<number>;
    greenFactor: PropType<number>;
    baseShift: PropType<number>;
}>, () => (import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined)[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    url: PropType<string>;
    tiles: PropType<string[]>;
    bounds: PropType<number[]>;
    minzoom: PropType<number>;
    maxzoom: PropType<number>;
    tileSize: PropType<number>;
    attribution: PropType<string>;
    encoding: PropType<"terrarium" | "mapbox" | "custom">;
    volatile: PropType<boolean>;
    redFactor: PropType<number>;
    blueFactor: PropType<number>;
    greenFactor: PropType<number>;
    baseShift: PropType<number>;
}>> & Readonly<{}>, {}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
