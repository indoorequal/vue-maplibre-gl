import { PropType, SlotsType } from 'vue';
import { Coordinates } from 'maplibre-gl';
/**
 * See [CanvasSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/CanvasSource/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    coordinates: PropType<Coordinates>;
    animate: PropType<boolean>;
    canvas: PropType<HTMLCanvasElement | string>;
}>, () => (import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined)[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    sourceId: {
        type: PropType<string>;
        required: true;
    };
    coordinates: PropType<Coordinates>;
    animate: PropType<boolean>;
    canvas: PropType<HTMLCanvasElement | string>;
}>> & Readonly<{}>, {}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
