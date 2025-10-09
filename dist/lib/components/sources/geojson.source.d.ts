import { PropType, SlotsType } from 'vue';
import { PromoteIdSpecification } from 'maplibre-gl';
type DataType = GeoJSON.GeoJSON | string;
/**
 * See [GeoJSONSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    data: {
        type: PropType<DataType>;
        required: true;
    };
    maxzoom: PropType<number>;
    attribution: PropType<string>;
    buffer: PropType<number>;
    tolerance: PropType<number>;
    cluster: PropType<boolean>;
    clusterRadius: PropType<number>;
    clusterMaxZoom: PropType<number>;
    clusterMinPoints: PropType<number>;
    clusterProperties: PropType<unknown>;
    lineMetrics: PropType<boolean>;
    generateId: PropType<boolean>;
    promoteId: PropType<PromoteIdSpecification>;
    filter: PropType<unknown>;
}>, () => (import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined)[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    data: {
        type: PropType<DataType>;
        required: true;
    };
    maxzoom: PropType<number>;
    attribution: PropType<string>;
    buffer: PropType<number>;
    tolerance: PropType<number>;
    cluster: PropType<boolean>;
    clusterRadius: PropType<number>;
    clusterMaxZoom: PropType<number>;
    clusterMinPoints: PropType<number>;
    clusterProperties: PropType<unknown>;
    lineMetrics: PropType<boolean>;
    generateId: PropType<boolean>;
    promoteId: PropType<PromoteIdSpecification>;
    filter: PropType<unknown>;
}>> & Readonly<{}>, {}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
