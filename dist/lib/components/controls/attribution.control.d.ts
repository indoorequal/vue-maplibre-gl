import { PropType } from 'vue';
import { ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
/**
 * Render Attribution Control
 *
 * See [AttributionControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * If true, the attribution control will always collapse when moving the map. If false, force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide. Attribution should not be collapsed if it can comfortably fit on the map. compact should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.
     */
    compact: PropType<boolean>;
    /**
     * Attributions to show in addition to any other attributions.
     */
    customAttribution: PropType<string | string[]>;
}>, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        validator: (v: Position) => boolean;
    };
    /**
     * If true, the attribution control will always collapse when moving the map. If false, force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide. Attribution should not be collapsed if it can comfortably fit on the map. compact should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.
     */
    compact: PropType<boolean>;
    /**
     * Attributions to show in addition to any other attributions.
     */
    customAttribution: PropType<string | string[]>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
