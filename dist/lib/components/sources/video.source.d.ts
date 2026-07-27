import { PropType, SlotsType } from 'vue';
import { Coordinates } from 'maplibre-gl';
/**
 * See [VideoSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/VideoSource/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    urls: PropType<string[]>;
    coordinates: PropType<Coordinates>;
}>, () => (import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined)[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    urls: PropType<string[]>;
    coordinates: PropType<Coordinates>;
}>> & Readonly<{}>, {}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
