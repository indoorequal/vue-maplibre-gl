import { PropType } from 'vue';
import { ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
export declare enum ScaleControlUnit {
    IMPERIAL = "imperial",
    METRIC = "metric",
    NAUTICAL = "nautical"
}
type UnitValue = ScaleControlUnit | "imperial" | "metric" | "nautical";
/**
 * Render Scale Control
 *
 * See [ScaleControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScaleControl/)
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
     * The maximum length of the scale control in pixels. Default Value `100`
     */
    maxWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * Set the scale's unit of the distance ('imperial', 'metric' or 'nautical').
     */
    unit: {
        type: PropType<UnitValue>;
        default: ScaleControlUnit;
        validator: (v: ScaleControlUnit) => boolean;
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
     * The maximum length of the scale control in pixels. Default Value `100`
     */
    maxWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * Set the scale's unit of the distance ('imperial', 'metric' or 'nautical').
     */
    unit: {
        type: PropType<UnitValue>;
        default: ScaleControlUnit;
        validator: (v: ScaleControlUnit) => boolean;
    };
}>> & Readonly<{}>, {
    maxWidth: number;
    unit: UnitValue;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
