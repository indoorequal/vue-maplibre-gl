import { PropType } from 'vue';
import { ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
/**
 * Render Navigation Control
 *
 * See [NavigationControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/)
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
     * If true the compass button is included.
     */
    showCompass: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * If true the zoom-in and zoom-out buttons are included.
     */
    showZoom: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * If true the pitch is visualized by rotating X-axis of compass.
     */
    visualizePitch: PropType<boolean>;
}>, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * If true the compass button is included.
     */
    showCompass: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * If true the zoom-in and zoom-out buttons are included.
     */
    showZoom: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * If true the pitch is visualized by rotating X-axis of compass.
     */
    visualizePitch: PropType<boolean>;
}>> & Readonly<{}>, {
    showCompass: boolean;
    showZoom: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
