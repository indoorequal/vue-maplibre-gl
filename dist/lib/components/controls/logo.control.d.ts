import { PropType } from 'vue';
import { ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
/**
 * Render Logo Control
 *
 * See [LogoControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/LogoControl/)
 * @since 6.2.0
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-left'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * If true, force a compact logo. If false, force the full logo. The default is a responsive logo that collapses when the map is less than 640 pixels wide.
     */
    compact: {
        type: PropType<boolean>;
    };
}>, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-left'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * If true, force a compact logo. If false, force the full logo. The default is a responsive logo that collapses when the map is less than 640 pixels wide.
     */
    compact: {
        type: PropType<boolean>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
