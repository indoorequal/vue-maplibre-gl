import { PropType, SlotsType } from 'vue';
import { FitBoundsOptions, LngLatBoundsLike, LngLatLike, RequestTransformFunction, StyleSpecification, CameraUpdateTransformFunction, AttributionControlOptions, WebGLContextAttributesWithType } from 'maplibre-gl';
import { Position } from './controls/position.enum';
/**
 * The map component
 *
 * See [Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/).
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Width of the map container
     */
    width: {
        type: PropType<number | string>;
        default: string;
    };
    /**
     * Height of the map container
     */
    height: {
        type: PropType<number | string>;
        default: string;
    };
    /**
     * If set, an AttributionControl will be added to the map with the provided options. To disable the attribution control, pass false. Note: showing the logo of MapLibre is not required for using MapLibre. Default Value ts compact: true, customAttribution: "MapLibre ...".
     */
    attributionControl: {
        type: PropType<false | AttributionControlOptions>;
        default: undefined;
    };
    /**
     * The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @vmodel v-model:bearing
     */
    bearing: {
        type: PropType<number>;
    };
    /**
     * The threshold, measured in degrees, that determines when the map's bearing will snap to north. For example, with a bearingSnap of 7, if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north. Default Value `7`
     */
    bearingSnap: {
        type: PropType<number>;
    };
    /**
     * The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options.
     */
    bounds: {
        type: PropType<LngLatBoundsLike>;
    };
    /**
     * If true, the "box zoom" interaction is enabled (see BoxZoomHandler). Default Value ts true
     */
    boxZoom: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     *  The initial geographical centerpoint of the map. If center is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to [0, 0] Note: MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. Default Value ts [0, 0]
     * @vmodel v-model:center
     */
    center: {
        type: PropType<LngLatLike>;
    };
    /**
     * The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag). Default Value ts true
     */
    clickTolerance: {
        type: PropType<number>;
    };
    /**
     * If true, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a resourceTiming property of relevant data events. Default Value `false`
     */
    collectResourceTiming: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, symbols from multiple sources can collide with each other during collision detection. If false, collision detection is run separately for the symbols in each source. Default Value `true`
     */
    crossSourceCollisions: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the "drag to pan" interaction is enabled. An Object value is passed as options to DragPanHandler#enable. Default Value `true`
     */
    dragPan: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the "drag to rotate" interaction is enabled (see DragRotateHandler). Default Value `true`
     */
    dragRotate: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the "double click to zoom" interaction is enabled (see DoubleClickZoomHandler). Default Value `true`
     */
    doubleClickZoom: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. For example, http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60. An additional string may optionally be provided to indicate a parameter-styled hash, e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash. Default Value `false`
     */
    hash: {
        type: PropType<boolean | string>;
        default: undefined;
    };
    /**
     * Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading. Default Value `300`
     */
    fadeDuration: {
        type: PropType<number>;
    };
    /**
     * A FitBoundsOptions options object to use only when fitting the initial bounds provided above.
     */
    fitBoundsOptions: {
        type: PropType<FitBoundsOptions>;
    };
    /**
     * If false, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction. Default Value `true`
     */
    interactive: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, keyboard shortcuts are enabled (see KeyboardHandler). Default Value `true`
     */
    keyboard: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * A patch to apply to the default localization table for UI strings, e.g. control tooltips. The locale object maps namespaced UI string IDs to translated strings in the target language; see src/ui/default_locale.js for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table). Default Value `null`
     */
    locale: {
        type: PropType<Record<string, string>>;
    };
    localIdeographFontFamily: {
        type: PropType<string>;
    };
    /**
     * A string representing the position of the MapLibre wordmark on the map. Valid options are top-left,top-right, bottom-left, or bottom-right. Default Value 'bottom-left'
     */
    logoPosition: {
        type: PropType<Position>;
        validator: (val: Position) => boolean;
    };
    /**
     * If set, the map will be constrained to the given bounds.
     */
    maxBounds: {
        type: PropType<LngLatBoundsLike>;
    };
    /**
     * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `60`
     */
    maxPitch: {
        type: PropType<number>;
    };
    /**
     * The maximum zoom level of the map (0-24). Default Value `22`
     */
    maxZoom: {
        type: PropType<number>;
    };
    /**
     * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     */
    minPitch: {
        type: PropType<number>;
    };
    /**
     * The minimum zoom level of the map (0-24). Default Value `0`
     */
    minZoom: {
        type: PropType<number>;
    };
    /**
     * The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If pitch is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     * @vmodel v-model:pitch
     */
    pitch: {
        type: PropType<number>;
    };
    /**
     * If false, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled. Default Value `true`
     */
    pitchWithRotate: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * Set of WebGLContextAttributes that are applied to the WebGL context of the map. See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext for more details. contextType can be set to webgl2 or webgl to force a WebGL version. Not setting it, Maplibre will do it's best to get a suitable context.
     * @since 8.0.0
     */
    canvasContextAttributes: {
        type: PropType<WebGLContextAttributesWithType>;
    };
    /**
     * If false, the map won't attempt to re-request tiles once they expire per their HTTP cacheControl/expires headers. Default Value `true`
     */
    refreshExpiredTiles: {
        type: PropType<boolean>;
        default: undefined;
    };
    renderWorldCopies: {
        type: PropType<boolean>;
        default: undefined;
    };
    scrollZoom: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * An optional string link to a URL, or an inlined JSON object containing a MapLibre Style Specification.
     *
     * Documentation: https://maplibre.org/maplibre-style-spec
     *
     * Example: https://demotiles.maplibre.org/style.json
     */
    mapStyle: {
        type: PropType<string | StyleSpecification>;
    };
    /**
     * If `true`, the map will automatically resize when the browser window resizes.
     * Default value true
     */
    trackResize: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
     * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.
     */
    transformRequest: {
        type: PropType<RequestTransformFunction>;
    };
    /**
     * A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
     * Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
     * @since 6.4.0
     */
    transformCameraUpdate: {
        type: PropType<CameraUpdateTransformFunction>;
    };
    /**
     * The map's TwoFingersTouchZoomRotateHandler, which allows the user to zoom or rotate the map with touch gestures.
     * Find more details and examples using `touchZoomRotate` in the TwoFingersTouchZoomRotateHandler section.
     */
    touchZoomRotate: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * The map's TwoFingersTouchPitchHandler, which allows the user to pitch the map with touch gestures.
     * Find more details and examples using `touchPitch` in the TwoFingersTouchPitchHandler section.
     */
    touchPitch: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @vmodel v-model:zoom
     */
    zoom: {
        type: PropType<number>;
    };
    /**
     * The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.
     * Default value null
     */
    maxTileCacheSize: {
        type: PropType<number>;
    };
    /**
     * The name or symbol to reference a map via useMap composable
     */
    mapKey: {
        type: PropType<string | symbol>;
    };
    /**
     * The pixel ratio. The canvas' width attribute will be container.clientWidth * pixelRatio and its height attribute will be container.clientHeight * pixelRatio. Defaults to devicePixelRatio if not specified.
     */
    pixelRatio: {
        type: PropType<number>;
    };
    /**
     * If false, style validation will be skipped. Useful in production environment.
     * Default value true
     * @since 6.4.0
     */
    validateStyle: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * The map's {@link CooperativeGesturesHandler}, which allows the user to see cooperative gesture info when user tries to zoom in/out.
     * Find more details and examples using `cooperativeGestures` in the {@link CooperativeGesturesHandler} section.
     */
    cooperativeGestures: {
        type: PropType<boolean>;
    };
}>, () => (import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> | import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined)[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("map:error" | "map:load" | "map:idle" | "map:remove" | "map:render" | "map:resize" | "map:webglcontextlost" | "map:webglcontextrestored" | "map:dataloading" | "map:data" | "map:tiledataloading" | "map:sourcedataloading" | "map:styledataloading" | "map:sourcedata" | "map:styledata" | "map:styleimagemissing" | "map:dataabort" | "map:sourcedataabort" | "map:boxzoomcancel" | "map:boxzoomstart" | "map:boxzoomend" | "map:touchcancel" | "map:touchmove" | "map:touchend" | "map:touchstart" | "map:click" | "map:contextmenu" | "map:dblclick" | "map:mousemove" | "map:mouseup" | "map:mousedown" | "map:mouseout" | "map:mouseover" | "map:movestart" | "map:move" | "map:moveend" | "map:zoomstart" | "map:zoom" | "map:zoomend" | "map:rotatestart" | "map:rotate" | "map:rotateend" | "map:dragstart" | "map:drag" | "map:dragend" | "map:pitchstart" | "map:pitch" | "map:pitchend" | "map:wheel" | "map:terrain" | "map:cooperativegestureprevented" | "map:projectiontransition" | "update:center" | "update:zoom" | "update:pitch" | "update:bearing")[], "map:error" | "map:load" | "map:idle" | "map:remove" | "map:render" | "map:resize" | "map:webglcontextlost" | "map:webglcontextrestored" | "map:dataloading" | "map:data" | "map:tiledataloading" | "map:sourcedataloading" | "map:styledataloading" | "map:sourcedata" | "map:styledata" | "map:styleimagemissing" | "map:dataabort" | "map:sourcedataabort" | "map:boxzoomcancel" | "map:boxzoomstart" | "map:boxzoomend" | "map:touchcancel" | "map:touchmove" | "map:touchend" | "map:touchstart" | "map:click" | "map:contextmenu" | "map:dblclick" | "map:mousemove" | "map:mouseup" | "map:mousedown" | "map:mouseout" | "map:mouseover" | "map:movestart" | "map:move" | "map:moveend" | "map:zoomstart" | "map:zoom" | "map:zoomend" | "map:rotatestart" | "map:rotate" | "map:rotateend" | "map:dragstart" | "map:drag" | "map:dragend" | "map:pitchstart" | "map:pitch" | "map:pitchend" | "map:wheel" | "map:terrain" | "map:cooperativegestureprevented" | "map:projectiontransition" | "update:center" | "update:zoom" | "update:pitch" | "update:bearing", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Width of the map container
     */
    width: {
        type: PropType<number | string>;
        default: string;
    };
    /**
     * Height of the map container
     */
    height: {
        type: PropType<number | string>;
        default: string;
    };
    /**
     * If set, an AttributionControl will be added to the map with the provided options. To disable the attribution control, pass false. Note: showing the logo of MapLibre is not required for using MapLibre. Default Value ts compact: true, customAttribution: "MapLibre ...".
     */
    attributionControl: {
        type: PropType<false | AttributionControlOptions>;
        default: undefined;
    };
    /**
     * The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @vmodel v-model:bearing
     */
    bearing: {
        type: PropType<number>;
    };
    /**
     * The threshold, measured in degrees, that determines when the map's bearing will snap to north. For example, with a bearingSnap of 7, if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north. Default Value `7`
     */
    bearingSnap: {
        type: PropType<number>;
    };
    /**
     * The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options.
     */
    bounds: {
        type: PropType<LngLatBoundsLike>;
    };
    /**
     * If true, the "box zoom" interaction is enabled (see BoxZoomHandler). Default Value ts true
     */
    boxZoom: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     *  The initial geographical centerpoint of the map. If center is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to [0, 0] Note: MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. Default Value ts [0, 0]
     * @vmodel v-model:center
     */
    center: {
        type: PropType<LngLatLike>;
    };
    /**
     * The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag). Default Value ts true
     */
    clickTolerance: {
        type: PropType<number>;
    };
    /**
     * If true, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a resourceTiming property of relevant data events. Default Value `false`
     */
    collectResourceTiming: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, symbols from multiple sources can collide with each other during collision detection. If false, collision detection is run separately for the symbols in each source. Default Value `true`
     */
    crossSourceCollisions: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the "drag to pan" interaction is enabled. An Object value is passed as options to DragPanHandler#enable. Default Value `true`
     */
    dragPan: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the "drag to rotate" interaction is enabled (see DragRotateHandler). Default Value `true`
     */
    dragRotate: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the "double click to zoom" interaction is enabled (see DoubleClickZoomHandler). Default Value `true`
     */
    doubleClickZoom: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. For example, http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60. An additional string may optionally be provided to indicate a parameter-styled hash, e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash. Default Value `false`
     */
    hash: {
        type: PropType<boolean | string>;
        default: undefined;
    };
    /**
     * Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading. Default Value `300`
     */
    fadeDuration: {
        type: PropType<number>;
    };
    /**
     * A FitBoundsOptions options object to use only when fitting the initial bounds provided above.
     */
    fitBoundsOptions: {
        type: PropType<FitBoundsOptions>;
    };
    /**
     * If false, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction. Default Value `true`
     */
    interactive: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * If true, keyboard shortcuts are enabled (see KeyboardHandler). Default Value `true`
     */
    keyboard: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * A patch to apply to the default localization table for UI strings, e.g. control tooltips. The locale object maps namespaced UI string IDs to translated strings in the target language; see src/ui/default_locale.js for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table). Default Value `null`
     */
    locale: {
        type: PropType<Record<string, string>>;
    };
    localIdeographFontFamily: {
        type: PropType<string>;
    };
    /**
     * A string representing the position of the MapLibre wordmark on the map. Valid options are top-left,top-right, bottom-left, or bottom-right. Default Value 'bottom-left'
     */
    logoPosition: {
        type: PropType<Position>;
        validator: (val: Position) => boolean;
    };
    /**
     * If set, the map will be constrained to the given bounds.
     */
    maxBounds: {
        type: PropType<LngLatBoundsLike>;
    };
    /**
     * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `60`
     */
    maxPitch: {
        type: PropType<number>;
    };
    /**
     * The maximum zoom level of the map (0-24). Default Value `22`
     */
    maxZoom: {
        type: PropType<number>;
    };
    /**
     * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     */
    minPitch: {
        type: PropType<number>;
    };
    /**
     * The minimum zoom level of the map (0-24). Default Value `0`
     */
    minZoom: {
        type: PropType<number>;
    };
    /**
     * The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If pitch is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     * @vmodel v-model:pitch
     */
    pitch: {
        type: PropType<number>;
    };
    /**
     * If false, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled. Default Value `true`
     */
    pitchWithRotate: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * Set of WebGLContextAttributes that are applied to the WebGL context of the map. See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext for more details. contextType can be set to webgl2 or webgl to force a WebGL version. Not setting it, Maplibre will do it's best to get a suitable context.
     * @since 8.0.0
     */
    canvasContextAttributes: {
        type: PropType<WebGLContextAttributesWithType>;
    };
    /**
     * If false, the map won't attempt to re-request tiles once they expire per their HTTP cacheControl/expires headers. Default Value `true`
     */
    refreshExpiredTiles: {
        type: PropType<boolean>;
        default: undefined;
    };
    renderWorldCopies: {
        type: PropType<boolean>;
        default: undefined;
    };
    scrollZoom: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * An optional string link to a URL, or an inlined JSON object containing a MapLibre Style Specification.
     *
     * Documentation: https://maplibre.org/maplibre-style-spec
     *
     * Example: https://demotiles.maplibre.org/style.json
     */
    mapStyle: {
        type: PropType<string | StyleSpecification>;
    };
    /**
     * If `true`, the map will automatically resize when the browser window resizes.
     * Default value true
     */
    trackResize: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
     * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.
     */
    transformRequest: {
        type: PropType<RequestTransformFunction>;
    };
    /**
     * A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
     * Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
     * @since 6.4.0
     */
    transformCameraUpdate: {
        type: PropType<CameraUpdateTransformFunction>;
    };
    /**
     * The map's TwoFingersTouchZoomRotateHandler, which allows the user to zoom or rotate the map with touch gestures.
     * Find more details and examples using `touchZoomRotate` in the TwoFingersTouchZoomRotateHandler section.
     */
    touchZoomRotate: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * The map's TwoFingersTouchPitchHandler, which allows the user to pitch the map with touch gestures.
     * Find more details and examples using `touchPitch` in the TwoFingersTouchPitchHandler section.
     */
    touchPitch: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @vmodel v-model:zoom
     */
    zoom: {
        type: PropType<number>;
    };
    /**
     * The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.
     * Default value null
     */
    maxTileCacheSize: {
        type: PropType<number>;
    };
    /**
     * The name or symbol to reference a map via useMap composable
     */
    mapKey: {
        type: PropType<string | symbol>;
    };
    /**
     * The pixel ratio. The canvas' width attribute will be container.clientWidth * pixelRatio and its height attribute will be container.clientHeight * pixelRatio. Defaults to devicePixelRatio if not specified.
     */
    pixelRatio: {
        type: PropType<number>;
    };
    /**
     * If false, style validation will be skipped. Useful in production environment.
     * Default value true
     * @since 6.4.0
     */
    validateStyle: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * The map's {@link CooperativeGesturesHandler}, which allows the user to see cooperative gesture info when user tries to zoom in/out.
     * Find more details and examples using `cooperativeGestures` in the {@link CooperativeGesturesHandler} section.
     */
    cooperativeGestures: {
        type: PropType<boolean>;
    };
}>> & Readonly<{
    "onMap:error"?: ((...args: any[]) => any) | undefined;
    "onMap:load"?: ((...args: any[]) => any) | undefined;
    "onMap:idle"?: ((...args: any[]) => any) | undefined;
    "onMap:remove"?: ((...args: any[]) => any) | undefined;
    "onMap:render"?: ((...args: any[]) => any) | undefined;
    "onMap:resize"?: ((...args: any[]) => any) | undefined;
    "onMap:webglcontextlost"?: ((...args: any[]) => any) | undefined;
    "onMap:webglcontextrestored"?: ((...args: any[]) => any) | undefined;
    "onMap:dataloading"?: ((...args: any[]) => any) | undefined;
    "onMap:data"?: ((...args: any[]) => any) | undefined;
    "onMap:tiledataloading"?: ((...args: any[]) => any) | undefined;
    "onMap:sourcedataloading"?: ((...args: any[]) => any) | undefined;
    "onMap:styledataloading"?: ((...args: any[]) => any) | undefined;
    "onMap:sourcedata"?: ((...args: any[]) => any) | undefined;
    "onMap:styledata"?: ((...args: any[]) => any) | undefined;
    "onMap:styleimagemissing"?: ((...args: any[]) => any) | undefined;
    "onMap:dataabort"?: ((...args: any[]) => any) | undefined;
    "onMap:sourcedataabort"?: ((...args: any[]) => any) | undefined;
    "onMap:boxzoomcancel"?: ((...args: any[]) => any) | undefined;
    "onMap:boxzoomstart"?: ((...args: any[]) => any) | undefined;
    "onMap:boxzoomend"?: ((...args: any[]) => any) | undefined;
    "onMap:touchcancel"?: ((...args: any[]) => any) | undefined;
    "onMap:touchmove"?: ((...args: any[]) => any) | undefined;
    "onMap:touchend"?: ((...args: any[]) => any) | undefined;
    "onMap:touchstart"?: ((...args: any[]) => any) | undefined;
    "onMap:click"?: ((...args: any[]) => any) | undefined;
    "onMap:contextmenu"?: ((...args: any[]) => any) | undefined;
    "onMap:dblclick"?: ((...args: any[]) => any) | undefined;
    "onMap:mousemove"?: ((...args: any[]) => any) | undefined;
    "onMap:mouseup"?: ((...args: any[]) => any) | undefined;
    "onMap:mousedown"?: ((...args: any[]) => any) | undefined;
    "onMap:mouseout"?: ((...args: any[]) => any) | undefined;
    "onMap:mouseover"?: ((...args: any[]) => any) | undefined;
    "onMap:movestart"?: ((...args: any[]) => any) | undefined;
    "onMap:move"?: ((...args: any[]) => any) | undefined;
    "onMap:moveend"?: ((...args: any[]) => any) | undefined;
    "onMap:zoomstart"?: ((...args: any[]) => any) | undefined;
    "onMap:zoom"?: ((...args: any[]) => any) | undefined;
    "onMap:zoomend"?: ((...args: any[]) => any) | undefined;
    "onMap:rotatestart"?: ((...args: any[]) => any) | undefined;
    "onMap:rotate"?: ((...args: any[]) => any) | undefined;
    "onMap:rotateend"?: ((...args: any[]) => any) | undefined;
    "onMap:dragstart"?: ((...args: any[]) => any) | undefined;
    "onMap:drag"?: ((...args: any[]) => any) | undefined;
    "onMap:dragend"?: ((...args: any[]) => any) | undefined;
    "onMap:pitchstart"?: ((...args: any[]) => any) | undefined;
    "onMap:pitch"?: ((...args: any[]) => any) | undefined;
    "onMap:pitchend"?: ((...args: any[]) => any) | undefined;
    "onMap:wheel"?: ((...args: any[]) => any) | undefined;
    "onMap:terrain"?: ((...args: any[]) => any) | undefined;
    "onMap:cooperativegestureprevented"?: ((...args: any[]) => any) | undefined;
    "onMap:projectiontransition"?: ((...args: any[]) => any) | undefined;
    "onUpdate:center"?: ((...args: any[]) => any) | undefined;
    "onUpdate:zoom"?: ((...args: any[]) => any) | undefined;
    "onUpdate:pitch"?: ((...args: any[]) => any) | undefined;
    "onUpdate:bearing"?: ((...args: any[]) => any) | undefined;
}>, {
    width: string | number;
    height: string | number;
    attributionControl: false | AttributionControlOptions;
    boxZoom: boolean;
    collectResourceTiming: boolean;
    crossSourceCollisions: boolean;
    dragPan: boolean;
    dragRotate: boolean;
    doubleClickZoom: boolean;
    hash: string | boolean;
    interactive: boolean;
    keyboard: boolean;
    pitchWithRotate: boolean;
    refreshExpiredTiles: boolean;
    renderWorldCopies: boolean;
    scrollZoom: boolean;
    trackResize: boolean;
    touchZoomRotate: boolean;
    touchPitch: boolean;
    validateStyle: boolean;
}, SlotsType<{
    default: unknown;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
