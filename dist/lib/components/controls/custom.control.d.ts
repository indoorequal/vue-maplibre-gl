import { PropType, SlotsType } from 'vue';
import { ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
/**
 * Render a custom control with your content in the default slot
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-left'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * Set the classes on the control div
     * @since 6.1.0
     */
    class: {
        type: PropType<string>;
        default: string;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-left'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * Set the classes on the control div
     * @since 6.1.0
     */
    class: {
        type: PropType<string>;
        default: string;
    };
}>> & Readonly<{}>, {
    class: string;
}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
