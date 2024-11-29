import { Position } from "@/lib/components/controls/position.enum";
import { defaults } from "@/lib/defaults";
import { isLngLatEqual } from "@/lib/lib/lng_lat";
import {
  MAP_EVENT_TYPES,
  createEventHandler,
  type MapEvent,
  type MapEventHandler,
} from "@/lib/lib/map.lib";
import { registerMap } from "@/lib/lib/mapRegistry";
import {
  componentIdSymbol,
  isInitializedSymbol,
  isLoadedSymbol,
  mapSymbol,
  sourceIdSymbol,
} from "@/lib/types";
import {
  Map as MaplibreMap,
  type AttributionControlOptions,
  type CameraUpdateTransformFunction,
  type FitBoundsOptions,
  type GestureOptions,
  type LngLatBoundsLike,
  type LngLatLike,
  type MapEventType,
  type RequestTransformFunction,
  type StyleSpecification,
} from "maplibre-gl";
import {
  defineComponent,
  getCurrentInstance,
  h,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  watch,
  type PropType,
  type SlotsType,
} from "vue";

/**
 * The map component
 *
 * See [Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/).
 */
export default defineComponent({
  name: "MglMap",
  props: {
    /**
     * Width of the map container
     */
    width: {
      type: [Number, String] as PropType<number | string>,
      default: "100%",
    },
    /**
     * Height of the map container
     */
    height: {
      type: [Number, String] as PropType<number | string>,
      default: "100%",
    },
    /**
     * If true, the gl context will be created with MSAA antialiasing, which can be useful for antialiasing custom layers. This is false by default as a performance optimization.
     */
    antialias: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.antialias,
    },
    /**
     * If set, an AttributionControl will be added to the map with the provided options. To disable the attribution control, pass false. Note: showing the logo of MapLibre is not required for using MapLibre. Default Value ts compact: true, customAttribution: "MapLibre ...".
     */
    attributionControl: {
      type: [Boolean, Object] as PropType<false | AttributionControlOptions>,
      default: () => defaults.attributionControl,
    },
    /**
     * The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @model
     */
    bearing: {
      type: Number as PropType<number>,
      default: () => defaults.bearing,
    },
    /**
     * The threshold, measured in degrees, that determines when the map's bearing will snap to north. For example, with a bearingSnap of 7, if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north. Default Value `7`
     */
    bearingSnap: {
      type: Number as PropType<number>,
      default: () => defaults.bearingSnap,
    },
    /**
     * The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options.
     */
    bounds: {
      type: [Array, Object] as PropType<LngLatBoundsLike>,
      default: () => defaults.bounds,
    },
    /**
     * If true, the "box zoom" interaction is enabled (see BoxZoomHandler). Default Value ts true
     */
    boxZoom: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.boxZoom,
    },
    /**
     *  The initial geographical centerpoint of the map. If center is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to [0, 0] Note: MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. Default Value ts [0, 0]
     * @model
     */
    center: {
      type: [Array, Object] as PropType<LngLatLike>,
      default: () => defaults.center,
    },
    /**
     * The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag). Default Value ts true
     */
    clickTolerance: {
      type: Number as PropType<number>,
      default: () => defaults.clickTolerance,
    },
    /**
     * If true, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a resourceTiming property of relevant data events. Default Value `false`
     */
    collectResourceTiming: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.collectResourceTiming,
    },
    /**
     * If true, symbols from multiple sources can collide with each other during collision detection. If false, collision detection is run separately for the symbols in each source. Default Value `true`
     */
    crossSourceCollisions: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.crossSourceCollisions,
    },
    /**
     * If true, the "drag to pan" interaction is enabled. An Object value is passed as options to DragPanHandler#enable. Default Value `true`
     */
    dragPan: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.dragPan,
    },
    /**
     * If true, the "drag to rotate" interaction is enabled (see DragRotateHandler). Default Value `true`
     */
    dragRotate: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.dragRotate,
    },
    /**
     * If true, the "double click to zoom" interaction is enabled (see DoubleClickZoomHandler). Default Value `true`
     */
    doubleClickZoom: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.doubleClickZoom,
    },
    /**
     * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. For example, http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60. An additional string may optionally be provided to indicate a parameter-styled hash, e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash. Default Value `false`
     */
    hash: {
      type: [Boolean, String] as PropType<boolean | string>,
      default: () => defaults.hash,
    },
    /**
     * Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading. Default Value `300`
     */
    fadeDuration: {
      type: Number as PropType<number>,
      default: () => defaults.fadeDuration,
    },
    /**
     * If true, map creation will fail if the performance of MapLibre GL JS would be dramatically worse than expected (i.e. a software renderer would be used). Default Value `false`
     */
    failIfMajorPerformanceCaveat: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.failIfMajorPerformanceCaveat,
    },
    /**
     * A FitBoundsOptions options object to use only when fitting the initial bounds provided above.
     */
    fitBoundsOptions: {
      type: Object as PropType<FitBoundsOptions>,
      default: () => defaults.fitBoundsOptions,
    },
    /**
     * If false, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction. Default Value `true`
     */
    interactive: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.interactive,
    },
    /**
     * If true, keyboard shortcuts are enabled (see KeyboardHandler). Default Value `true`
     */
    keyboard: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.keyboard,
    },
    /**
     * A patch to apply to the default localization table for UI strings, e.g. control tooltips. The locale object maps namespaced UI string IDs to translated strings in the target language; see src/ui/default_locale.js for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table). Default Value `null`
     */
    locale: {
      type: Object as PropType<Record<string, string>>,
      default: () => defaults.locale,
    },
    localIdeographFontFamily: {
      type: String as PropType<string>,
      default: () => defaults.localIdeographFontFamily,
    },
    /**
     * A string representing the position of the MapLibre wordmark on the map. Valid options are top-left,top-right, bottom-left, or bottom-right. Default Value 'bottom-left'
     */
    logoPosition: {
      type: [String] as PropType<Position>,
      validator: (val: Position) => val in Position,
      default: () => defaults.logoPosition,
    },
    /**
     * If set, the map will be constrained to the given bounds.
     */
    maxBounds: {
      type: [Array, Object] as PropType<LngLatBoundsLike>,
      default: () => defaults.maxBounds,
    },
    /**
     * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `60`
     */
    maxPitch: {
      type: Number as PropType<number>,
      default: () => defaults.maxPitch,
    },
    /**
     * The maximum zoom level of the map (0-24). Default Value `22`
     */
    maxZoom: {
      type: Number as PropType<number>,
      default: () => defaults.maxZoom,
    },
    /**
     * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     */
    minPitch: {
      type: Number as PropType<number>,
      default: () => defaults.minPitch,
    },
    /**
     * The minimum zoom level of the map (0-24). Default Value `0`
     */
    minZoom: {
      type: Number as PropType<number>,
      default: () => defaults.minZoom,
    },
    /**
     * If true, the map's canvas can be exported to a PNG using map.getCanvas().toDataURL(). This is false by default as a performance optimization. Default Value `false`
     */
    preserveDrawingBuffer: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.preserveDrawingBuffer,
    },
    /**
     * The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If pitch is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     * @model
     */
    pitch: { type: Number as PropType<number>, default: () => defaults.pitch },
    /**
     * If false, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled. Default Value `true`
     */
    pitchWithRotate: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.pitchWithRotate,
    },
    /**
     * If false, the map won't attempt to re-request tiles once they expire per their HTTP cacheControl/expires headers. Default Value `true`
     */
    refreshExpiredTiles: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.refreshExpiredTiles,
    },
    renderWorldCopies: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.renderWorldCopies,
    },
    scrollZoom: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.scrollZoom,
    },
    mapStyle: {
      type: [String, Object] as PropType<string | StyleSpecification>,
      default: () => defaults.style,
    },
    /**
     * If `true`, the map will automatically resize when the browser window resizes.
     * Default value true
     */
    trackResize: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.trackResize,
    },
    /**
     * A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
     * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.
     */
    transformRequest: {
      type: Function as PropType<RequestTransformFunction>,
      default: defaults.transformRequest,
    },
    /**
     * A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
     * Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
     * @since 6.4.0
     */
    transformCameraUpdate: {
      type: Function as PropType<CameraUpdateTransformFunction>,
      default: defaults.transformCameraUpdate,
    },
    /**
     * The map's TwoFingersTouchZoomRotateHandler, which allows the user to zoom or rotate the map with touch gestures.
     * Find more details and examples using `touchZoomRotate` in the TwoFingersTouchZoomRotateHandler section.
     */
    touchZoomRotate: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.touchZoomRotate,
    },
    /**
     * The map's TwoFingersTouchPitchHandler, which allows the user to pitch the map with touch gestures.
     * Find more details and examples using `touchPitch` in the TwoFingersTouchPitchHandler section.
     */
    touchPitch: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.touchPitch,
    },

    /**
     * The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @model
     */
    zoom: { type: Number as PropType<number>, default: () => defaults.zoom },
    /**
     * The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.
     * Default value null
     */
    maxTileCacheSize: {
      type: Number as PropType<number>,
      default: () => defaults.maxTileCacheSize,
    },
    /**
     * The name or symbol to reference a map via useMap composable
     */
    mapKey: { type: [String, Symbol] as PropType<string | symbol> },
    /**
     * The pixel ratio. The canvas' width attribute will be container.clientWidth * pixelRatio and its height attribute will be container.clientHeight * pixelRatio. Defaults to devicePixelRatio if not specified.
     */
    pixelRatio: {
      type: Number as PropType<number>,
      default: () => defaults.pixelRatio,
    },
    /**
     * If false, style validation will be skipped. Useful in production environment.
     * Default value true
     * @since 6.4.0
     */
    validateStyle: {
      type: Boolean as PropType<boolean>,
      default: () => defaults.validateStyle,
    },
    /**
     * The map's {@link CooperativeGesturesHandler}, which allows the user to see cooperative gesture info when user tries to zoom in/out.
     * Find more details and examples using `cooperativeGestures` in the {@link CooperativeGesturesHandler} section.
     */
    cooperativeGestures: {
      type: Object as PropType<GestureOptions>,
      default: () => defaults.cooperativeGestures,
    },
  },
  emits: [
    "map:error",
    "map:load",
    "map:idle",
    "map:remove",
    "map:render",
    "map:resize",
    "map:webglcontextlost",
    "map:webglcontextrestored",
    "map:dataloading",
    "map:data",
    "map:tiledataloading",
    "map:sourcedataloading",
    "map:styledataloading",
    "map:sourcedata",
    "map:styledata",
    "map:styleimagemissing",
    "map:dataabort",
    "map:sourcedataabort",
    "map:boxzoomcancel",
    "map:boxzoomstart",
    "map:boxzoomend",
    "map:touchcancel",
    "map:touchmove",
    "map:touchend",
    "map:touchstart",
    "map:click",
    "map:contextmenu",
    "map:dblclick",
    "map:mousemove",
    "map:mouseup",
    "map:mousedown",
    "map:mouseout",
    "map:mouseover",
    "map:movestart",
    "map:move",
    "map:moveend",
    "map:zoomstart",
    "map:zoom",
    "map:zoomend",
    "map:rotatestart",
    "map:rotate",
    "map:rotateend",
    "map:dragstart",
    "map:drag",
    "map:dragend",
    "map:pitchstart",
    "map:pitch",
    "map:pitchend",
    "map:wheel",
    "map:terrain",
    "map:cooperativegestureprevented",
    /**
     * Center property updated
     */
    "update:center",
    /**
     * Zoom property updated
     */
    "update:zoom",
    /**
     * Pitch property updated
     */
    "update:pitch",
    /**
     * Bearing property updated
     */
    "update:bearing",
  ],
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, ctx) {
    const component = markRaw(getCurrentInstance()!),
      container = shallowRef<HTMLDivElement>(),
      map = shallowRef<MaplibreMap>(),
      isInitialized = ref(false),
      isLoaded = ref(false),
      boundMapEvents = new Map<
        keyof MapEventType | `__${keyof MapEventType}`,
        MapEventHandler<keyof MapEventType>
      >(),
      registryItem = registerMap(component, map, props.mapKey);

    // Add resizeObserver ref
    const resizeObserver = shallowRef<ResizeObserver>();

    provide(mapSymbol, map);
    provide(isLoadedSymbol, isLoaded);
    provide(isInitializedSymbol, isInitialized);
    provide(componentIdSymbol, component.uid);
    provide(sourceIdSymbol, "");

    /*
     * bind prop watchers
     */
    watch(
      () => props.bearing,
      (v) => {
        if (v) {
          map.value?.setBearing(v);
        }
      },
    );
    watch(
      () => props.bounds,
      (v) => {
        if (v) {
          map.value?.fitBounds(v, props.fitBoundsOptions);
        }
      },
    );
    watch(
      () => props.center,
      (v) => {
        const center = map.value?.getCenter();
        if (v && center && !isLngLatEqual(v, center)) {
          map.value?.setCenter(v);
        }
      },
    );
    watch(
      () => props.maxBounds,
      (v) => {
        if (v) {
          map.value?.setMaxBounds(v);
        }
      },
    );
    watch(
      () => props.maxPitch,
      (v) => {
        if (v) {
          map.value?.setMaxPitch(v);
        }
      },
    );
    watch(
      () => props.maxZoom,
      (v) => {
        if (v) {
          map.value?.setMaxZoom(v);
        }
      },
    );
    watch(
      () => props.minPitch,
      (v) => {
        if (v) {
          map.value?.setMinPitch(v);
        }
      },
    );
    watch(
      () => props.minZoom,
      (v) => {
        if (v) {
          map.value?.setMinZoom(v);
        }
      },
    );
    watch(
      () => props.pitch,
      (v) => {
        if (v) {
          map.value?.setPitch(v);
        }
      },
    );
    watch(
      () => props.renderWorldCopies,
      (v) => {
        if (v) {
          map.value?.setRenderWorldCopies(v);
        }
      },
    );
    watch(
      () => props.mapStyle,
      (v) => {
        if (v) {
          map.value?.setStyle(v as StyleSpecification);
        }
      },
    );
    watch(
      () => props.transformRequest,
      (v) => {
        if (v) {
          map.value?.setTransformRequest(v);
        }
      },
    );
    watch(
      () => props.zoom,
      (v) => {
        if (v) {
          map.value?.setZoom(v);
        }
      },
    );
    watch(
      () => props.zoom,
      (v) => {
        if (v) {
          map.value?.setZoom(v);
        }
      },
    );

    function initialize() {
      registryItem.isMounted = true;

      // build options
      const opts: typeof props & {
        style?: string | StyleSpecification;
        container: HTMLElement;
      } = { ...props, style: props.mapStyle, container: container.value! };

      for (const opt of Object.keys(opts) as Array<keyof typeof opts>) {
        if (opts[opt] === undefined) {
          delete opts[opt];
        }
      }

      // init map
      map.value = markRaw(new MaplibreMap(opts));
      registryItem.map = map.value;
      isInitialized.value = true;
      boundMapEvents.set(
        "__load",
        () => ((isLoaded.value = true), (registryItem.isLoaded = true)),
      );
      map.value.on("load", boundMapEvents.get("__load")!);
      boundMapEvents.set("__moveend", () =>
        ctx.emit("update:center", map.value!.getCenter()),
      );
      map.value.on("moveend", boundMapEvents.get("__moveend")!);
      boundMapEvents.set("__zoomend", () =>
        ctx.emit("update:zoom", map.value!.getZoom()),
      );
      map.value.on("zoomend", boundMapEvents.get("__zoomend")!);
      boundMapEvents.set("__pitchend", () =>
        ctx.emit("update:pitch", map.value!.getPitch()),
      );
      map.value.on("pitchend", boundMapEvents.get("__pitchend")!);
      boundMapEvents.set("__rotateend", () =>
        ctx.emit("update:bearing", map.value!.getBearing()),
      );
      map.value.on("rotateend", boundMapEvents.get("__rotateend")!);

      // bind events
      if (component.vnode.props) {
        for (const event of MAP_EVENT_TYPES) {
          if (component.vnode.props["onMap:" + event]) {
            const eventName = `map:${event}`;
            const handler = createEventHandler<typeof event>(
              component,
              map.value,
              ctx,
              eventName as MapEvent,
            );
            boundMapEvents.set(event, handler);
            map.value.on(event, handler);
          }
        }
      }

      // automatic re-initialization of map on CONTEXT_LOST_WEBGL
      map.value.getCanvas().addEventListener("webglcontextlost", restart);

      // Add resize observer
      if (props.trackResize && container.value) {
        resizeObserver.value = new ResizeObserver(() => {
          if (map.value) {
            map.value.resize();
          }
        });
        resizeObserver.value.observe(container.value);
      }
    }

    async function dispose() {
      registryItem.isMounted = false;
      registryItem.isLoaded = false;
      isLoaded.value = false;

      if (map.value) {
        // unbind events
        map.value.getCanvas().removeEventListener("webglcontextlost", restart);
        isInitialized.value = false;
        boundMapEvents.forEach((func, en) => {
          map.value!.off(en.startsWith("__") ? en.substring(2) : en, func);
        });
        // destroy map
        map.value.remove();
      }

      // Add cleanup for resize observer
      if (resizeObserver.value) {
        resizeObserver.value.disconnect();
        resizeObserver.value = undefined;
      }
    }

    function restart() {
      dispose();
      nextTick(initialize);
    }

    /*
     * init map
     */
    onMounted(initialize);

    /*
     * Dispose component
     */
    onBeforeUnmount(dispose);

    ctx.expose({ map });

    return () => [
      h("div", {
        ref: container,
        style: { height: props.height, width: props.width },
      }),
      isInitialized.value && ctx.slots.default
        ? ctx.slots.default({})
        : undefined,
    ];
  },

  /**
   * Slot for controls, sources, marker and popup
   * @slot default
   */
  render() {
    return null;
  },
});
