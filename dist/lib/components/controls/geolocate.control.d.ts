import { PropType } from 'vue';
import { FitBoundsOptions, ControlPosition } from 'maplibre-gl';
import { Position } from './position.enum';
/**
 * Render GeolocateControl
 *
 * See [GeolocateControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/)
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        default: Position;
        validator: (v: Position) => boolean;
    };
    /**
     * A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.
     */
    positionOptions: {
        type: PropType<PositionOptions>;
        default: () => PositionOptions;
    };
    /**
     * A options object to use when the map is panned and zoomed to the user's location. The default is to use a maxZoom of 15 to limit how far the map will zoom in for very accurate locations.
     */
    fitBoundsOptions: {
        type: PropType<FitBoundsOptions>;
        default: () => FitBoundsOptions;
    };
    /**
     * If true the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes.
     */
    trackUserLocation: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * By default, if showUserLocation is true, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to false to disable. Always disabled when showUserLocation is false.
     */
    showAccuracyCircle: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * By default a dot will be shown on the map at the user's location. Set to false to disable.
     */
    showUserLocation: {
        type: PropType<boolean>;
        default: boolean;
    };
}>, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("error" | "trackuserlocationstart" | "trackuserlocationend" | "userlocationlostfocus" | "userlocationfocus" | "geolocate" | "outofmaxbounds")[], "error" | "trackuserlocationstart" | "trackuserlocationend" | "userlocationlostfocus" | "userlocationfocus" | "geolocate" | "outofmaxbounds", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
        type: PropType<ControlPosition>;
        default: Position;
        validator: (v: Position) => boolean;
    };
    /**
     * A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.
     */
    positionOptions: {
        type: PropType<PositionOptions>;
        default: () => PositionOptions;
    };
    /**
     * A options object to use when the map is panned and zoomed to the user's location. The default is to use a maxZoom of 15 to limit how far the map will zoom in for very accurate locations.
     */
    fitBoundsOptions: {
        type: PropType<FitBoundsOptions>;
        default: () => FitBoundsOptions;
    };
    /**
     * If true the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes.
     */
    trackUserLocation: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * By default, if showUserLocation is true, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to false to disable. Always disabled when showUserLocation is false.
     */
    showAccuracyCircle: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * By default a dot will be shown on the map at the user's location. Set to false to disable.
     */
    showUserLocation: {
        type: PropType<boolean>;
        default: boolean;
    };
}>> & Readonly<{
    onError?: ((...args: any[]) => any) | undefined;
    onTrackuserlocationstart?: ((...args: any[]) => any) | undefined;
    onTrackuserlocationend?: ((...args: any[]) => any) | undefined;
    onUserlocationlostfocus?: ((...args: any[]) => any) | undefined;
    onUserlocationfocus?: ((...args: any[]) => any) | undefined;
    onGeolocate?: ((...args: any[]) => any) | undefined;
    onOutofmaxbounds?: ((...args: any[]) => any) | undefined;
}>, {
    fitBoundsOptions: FitBoundsOptions;
    position: ControlPosition;
    positionOptions: PositionOptions;
    trackUserLocation: boolean;
    showAccuracyCircle: boolean;
    showUserLocation: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
