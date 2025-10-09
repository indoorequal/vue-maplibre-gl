import { PropType } from 'vue';
import { ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
/**
 * Render Fullscreen Control
 *
 * See [FullscreenControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/FullscreenControl/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * container is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.
     */
    container: {
        type: PropType<HTMLElement>;
        default: null;
    };
}>, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * container is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.
     */
    container: {
        type: PropType<HTMLElement>;
        default: null;
    };
}>> & Readonly<{}>, {
    container: HTMLElement;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
