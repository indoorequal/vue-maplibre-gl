import { PropType, SlotsType } from 'vue';
import { PromoteIdSpecification } from 'maplibre-gl';
/**
 * See [VectorTileSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/VectorTileSource/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    url: PropType<string>;
    tiles: PropType<string[]>;
    bounds: {
        type: PropType<number[]>;
        validator: (v: number[]) => boolean;
    };
    scheme: PropType<"xyz" | "tms">;
    minzoom: PropType<number>;
    maxzoom: PropType<number>;
    attribution: PropType<string>;
    promoteId: PropType<PromoteIdSpecification>;
    volatile: PropType<boolean>;
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
    bounds: {
        type: PropType<number[]>;
        validator: (v: number[]) => boolean;
    };
    scheme: PropType<"xyz" | "tms">;
    minzoom: PropType<number>;
    maxzoom: PropType<number>;
    attribution: PropType<string>;
    promoteId: PropType<PromoteIdSpecification>;
    volatile: PropType<boolean>;
}>> & Readonly<{}>, {}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
