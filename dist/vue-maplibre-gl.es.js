/*!
* @indoorequal/vue-maplibre-gl v8.4.3
* (c) 2025 François de Metz <francois@2metz.fr>
* @license MIT
*/
import { reactive as V, defineComponent as d, markRaw as W, getCurrentInstance as G, shallowRef as T, ref as _, provide as y, watch as s, onMounted as F, onBeforeUnmount as M, h as A, nextTick as Z, inject as m, createCommentVNode as S, Teleport as oe, warn as D, isRef as w } from "vue";
import { LngLat as U, Map as ae, AttributionControl as re, FullscreenControl as ne, GeolocateControl as ie, NavigationControl as ue, ScaleControl as le, LogoControl as se, Marker as ce, Popup as de } from "maplibre-gl";
const me = Symbol("map"), h = me, P = Symbol("isLoaded"), ge = Symbol("isInitialized"), $ = ge, L = Symbol("componentId"), O = Symbol("sourceId"), C = Symbol(
  "sourceLayerRegistry"
), J = Symbol("marker"), fe = [
  "error",
  "load",
  "idle",
  "remove",
  "render",
  "resize",
  "webglcontextlost",
  "webglcontextrestored",
  "dataloading",
  "data",
  "tiledataloading",
  "sourcedataloading",
  "styledataloading",
  "sourcedata",
  "styledata",
  "styleimagemissing",
  "dataabort",
  "sourcedataabort",
  "boxzoomcancel",
  "boxzoomstart",
  "boxzoomend",
  "touchcancel",
  "touchmove",
  "touchend",
  "touchstart",
  "click",
  "contextmenu",
  "dblclick",
  "mousemove",
  "mouseup",
  "mousedown",
  "mouseout",
  "mouseover",
  "movestart",
  "move",
  "moveend",
  "zoomstart",
  "zoom",
  "zoomend",
  "rotatestart",
  "rotate",
  "rotateend",
  "dragstart",
  "drag",
  "dragend",
  "pitchstart",
  "pitch",
  "pitchend",
  "wheel",
  "terrain",
  "cooperativegestureprevented"
];
function ye(e, t, r, a) {
  return (o) => r.emit(a, {
    type: o.type,
    map: t,
    component: e,
    event: o
  });
}
function ve(e, t) {
  const r = U.convert(e), a = U.convert(t);
  return r.lng === a.lng && r.lat === a.lat;
}
var k = /* @__PURE__ */ ((e) => (e.TOP_LEFT = "top-left", e.TOP_RIGHT = "top-right", e.BOTTOM_LEFT = "bottom-left", e.BOTTOM_RIGHT = "bottom-right", e))(k || {});
const x = Object.values(k), q = /* @__PURE__ */ new Map(), K = Symbol("default");
function tt(e = K) {
  let t = q.get(e);
  return t || (t = V({ isLoaded: !1, isMounted: !1, language: null }), q.set(e, t)), t;
}
function be(e, t, r = K) {
  let a = q.get(r);
  return a || (a = V({ isLoaded: !1, isMounted: !1, language: null }), q.set(r, a)), a.isLoaded = t.value?.loaded() || !1, a.isMounted = !1, a.component = e, a.map = t.value, a;
}
const pe = d({
  name: "MglMap",
  props: {
    /**
     * Width of the map container
     */
    width: {
      type: [Number, String],
      default: "100%"
    },
    /**
     * Height of the map container
     */
    height: {
      type: [Number, String],
      default: "100%"
    },
    /**
     * If set, an AttributionControl will be added to the map with the provided options. To disable the attribution control, pass false. Note: showing the logo of MapLibre is not required for using MapLibre. Default Value ts compact: true, customAttribution: "MapLibre ...".
     */
    attributionControl: {
      type: [Boolean, Object],
      default: void 0
    },
    /**
     * The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If bearing is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @vmodel v-model:bearing
     */
    bearing: {
      type: Number
    },
    /**
     * The threshold, measured in degrees, that determines when the map's bearing will snap to north. For example, with a bearingSnap of 7, if the user rotates the map within 7 degrees of north, the map will automatically snap to exact north. Default Value `7`
     */
    bearingSnap: {
      type: Number
    },
    /**
     * The initial bounds of the map. If bounds is specified, it overrides center and zoom constructor options.
     */
    bounds: {
      type: [Array, Object]
    },
    /**
     * If true, the "box zoom" interaction is enabled (see BoxZoomHandler). Default Value ts true
     */
    boxZoom: {
      type: Boolean,
      default: void 0
    },
    /**
     *  The initial geographical centerpoint of the map. If center is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to [0, 0] Note: MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON. Default Value ts [0, 0]
     * @vmodel v-model:center
     */
    center: {
      type: [Array, Object]
    },
    /**
     * The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag). Default Value ts true
     */
    clickTolerance: {
      type: Number
    },
    /**
     * If true, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a resourceTiming property of relevant data events. Default Value `false`
     */
    collectResourceTiming: {
      type: Boolean,
      default: void 0
    },
    /**
     * If true, symbols from multiple sources can collide with each other during collision detection. If false, collision detection is run separately for the symbols in each source. Default Value `true`
     */
    crossSourceCollisions: {
      type: Boolean,
      default: void 0
    },
    /**
     * If true, the "drag to pan" interaction is enabled. An Object value is passed as options to DragPanHandler#enable. Default Value `true`
     */
    dragPan: {
      type: Boolean,
      default: void 0
    },
    /**
     * If true, the "drag to rotate" interaction is enabled (see DragRotateHandler). Default Value `true`
     */
    dragRotate: {
      type: Boolean,
      default: void 0
    },
    /**
     * If true, the "double click to zoom" interaction is enabled (see DoubleClickZoomHandler). Default Value `true`
     */
    doubleClickZoom: {
      type: Boolean,
      default: void 0
    },
    /**
     * If true, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL. For example, http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60. An additional string may optionally be provided to indicate a parameter-styled hash, e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo is a custom parameter and bar is an arbitrary hash distinct from the map hash. Default Value `false`
     */
    hash: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading. Default Value `300`
     */
    fadeDuration: {
      type: Number
    },
    /**
     * A FitBoundsOptions options object to use only when fitting the initial bounds provided above.
     */
    fitBoundsOptions: {
      type: Object
    },
    /**
     * If false, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction. Default Value `true`
     */
    interactive: {
      type: Boolean,
      default: void 0
    },
    /**
     * If true, keyboard shortcuts are enabled (see KeyboardHandler). Default Value `true`
     */
    keyboard: {
      type: Boolean,
      default: void 0
    },
    /**
     * A patch to apply to the default localization table for UI strings, e.g. control tooltips. The locale object maps namespaced UI string IDs to translated strings in the target language; see src/ui/default_locale.js for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table). Default Value `null`
     */
    locale: {
      type: Object
    },
    localIdeographFontFamily: {
      type: String
    },
    /**
     * A string representing the position of the MapLibre wordmark on the map. Valid options are top-left,top-right, bottom-left, or bottom-right. Default Value 'bottom-left'
     */
    logoPosition: {
      type: [String],
      validator: (e) => e in k
    },
    /**
     * If set, the map will be constrained to the given bounds.
     */
    maxBounds: {
      type: [Array, Object]
    },
    /**
     * The maximum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `60`
     */
    maxPitch: {
      type: Number
    },
    /**
     * The maximum zoom level of the map (0-24). Default Value `22`
     */
    maxZoom: {
      type: Number
    },
    /**
     * The minimum pitch of the map (0-85). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     */
    minPitch: {
      type: Number
    },
    /**
     * The minimum zoom level of the map (0-24). Default Value `0`
     */
    minZoom: {
      type: Number
    },
    /**
     * The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If pitch is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project. Default Value `0`
     * @vmodel v-model:pitch
     */
    pitch: {
      type: Number
    },
    /**
     * If false, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled. Default Value `true`
     */
    pitchWithRotate: {
      type: Boolean,
      default: void 0
    },
    /**
     * Set of WebGLContextAttributes that are applied to the WebGL context of the map. See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext for more details. contextType can be set to webgl2 or webgl to force a WebGL version. Not setting it, Maplibre will do it's best to get a suitable context.
     * @since 8.0.0
     */
    canvasContextAttributes: {
      type: Object
    },
    /**
     * If false, the map won't attempt to re-request tiles once they expire per their HTTP cacheControl/expires headers. Default Value `true`
     */
    refreshExpiredTiles: {
      type: Boolean,
      default: void 0
    },
    renderWorldCopies: {
      type: Boolean,
      default: void 0
    },
    scrollZoom: {
      type: Boolean,
      default: void 0
    },
    /**
     * An optional string link to a URL, or an inlined JSON object containing a MapLibre Style Specification.
     * 
     * Documentation: https://maplibre.org/maplibre-style-spec
     * 
     * Example: https://demotiles.maplibre.org/style.json
     */
    mapStyle: {
      type: [String, Object]
    },
    /**
     * If `true`, the map will automatically resize when the browser window resizes.
     * Default value true
     */
    trackResize: {
      type: Boolean,
      default: void 0
    },
    /**
     * A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
     * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.
     */
    transformRequest: {
      type: Function
    },
    /**
     * A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
     * Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
     * @since 6.4.0
     */
    transformCameraUpdate: {
      type: Function
    },
    /**
     * The map's TwoFingersTouchZoomRotateHandler, which allows the user to zoom or rotate the map with touch gestures.
     * Find more details and examples using `touchZoomRotate` in the TwoFingersTouchZoomRotateHandler section.
     */
    touchZoomRotate: {
      type: Boolean,
      default: void 0
    },
    /**
     * The map's TwoFingersTouchPitchHandler, which allows the user to pitch the map with touch gestures.
     * Find more details and examples using `touchPitch` in the TwoFingersTouchPitchHandler section.
     */
    touchPitch: {
      type: Boolean,
      default: void 0
    },
    /**
     * The initial zoom level of the map. If zoom is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to 0. Default Value `0`
     * @vmodel v-model:zoom
     */
    zoom: {
      type: Number
    },
    /**
     * The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.
     * Default value null
     */
    maxTileCacheSize: {
      type: Number
    },
    /**
     * The name or symbol to reference a map via useMap composable
     */
    mapKey: { type: [String, Symbol] },
    /**
     * The pixel ratio. The canvas' width attribute will be container.clientWidth * pixelRatio and its height attribute will be container.clientHeight * pixelRatio. Defaults to devicePixelRatio if not specified.
     */
    pixelRatio: {
      type: Number
    },
    /**
     * If false, style validation will be skipped. Useful in production environment.
     * Default value true
     * @since 6.4.0
     */
    validateStyle: {
      type: Boolean,
      default: void 0
    },
    /**
     * The map's {@link CooperativeGesturesHandler}, which allows the user to see cooperative gesture info when user tries to zoom in/out.
     * Find more details and examples using `cooperativeGestures` in the {@link CooperativeGesturesHandler} section.
     */
    cooperativeGestures: {
      type: Boolean
    }
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
    "map:projectiontransition",
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
    "update:bearing"
  ],
  slots: Object,
  setup(e, t) {
    const r = W(G()), a = T(), o = T(), u = _(!1), c = _(!1), l = /* @__PURE__ */ new Map(), g = be(r, o, e.mapKey);
    y(h, o), y(P, c), y($, u), y(L, r.uid), y(O, ""), s(
      () => e.bearing,
      (i) => {
        i && o.value?.setBearing(i);
      }
    ), s(
      () => e.bounds,
      (i) => {
        i && o.value?.fitBounds(i, e.fitBoundsOptions);
      }
    ), s(
      () => e.center,
      (i) => {
        const v = o.value?.getCenter();
        i && v && !ve(i, v) && o.value?.setCenter(i);
      }
    ), s(
      () => e.maxBounds,
      (i) => {
        i && o.value?.setMaxBounds(i);
      }
    ), s(
      () => e.maxPitch,
      (i) => {
        i && o.value?.setMaxPitch(i);
      }
    ), s(
      () => e.maxZoom,
      (i) => {
        i && o.value?.setMaxZoom(i);
      }
    ), s(
      () => e.minPitch,
      (i) => {
        i && o.value?.setMinPitch(i);
      }
    ), s(
      () => e.minZoom,
      (i) => {
        i && o.value?.setMinZoom(i);
      }
    ), s(
      () => e.pitch,
      (i) => {
        i && o.value?.setPitch(i);
      }
    ), s(
      () => e.renderWorldCopies,
      (i) => {
        i && o.value?.setRenderWorldCopies(i);
      }
    ), s(
      () => e.mapStyle,
      (i) => {
        i && o.value?.setStyle(i);
      }
    ), s(
      () => e.transformRequest,
      (i) => {
        i && o.value?.setTransformRequest(i);
      }
    ), s(
      () => e.zoom,
      (i) => {
        i && o.value?.setZoom(i);
      }
    ), s(
      () => e.zoom,
      (i) => {
        i && o.value?.setZoom(i);
      }
    );
    function n() {
      g.isMounted = !0;
      const i = { ...e, style: e.mapStyle, container: a.value };
      for (const v of Object.keys(i))
        i[v] === void 0 && delete i[v];
      if (o.value = W(new ae(i)), g.map = o.value, u.value = !0, l.set(
        "__load",
        () => (c.value = !0, g.isLoaded = !0)
      ), o.value.on("load", l.get("__load")), l.set(
        "__moveend",
        () => t.emit("update:center", o.value.getCenter())
      ), o.value.on("moveend", l.get("__moveend")), l.set(
        "__zoomend",
        () => t.emit("update:zoom", o.value.getZoom())
      ), o.value.on("zoomend", l.get("__zoomend")), l.set(
        "__pitchend",
        () => t.emit("update:pitch", o.value.getPitch())
      ), o.value.on("pitchend", l.get("__pitchend")), l.set(
        "__rotateend",
        () => t.emit("update:bearing", o.value.getBearing())
      ), o.value.on("rotateend", l.get("__rotateend")), r.vnode.props) {
        for (const v of fe)
          if (r.vnode.props["onMap:" + v]) {
            const te = `map:${v}`, H = ye(
              r,
              o.value,
              t,
              te
            );
            l.set(v, H), o.value.on(v, H);
          }
      }
      o.value.getCanvas().addEventListener("webglcontextlost", R);
    }
    async function f() {
      g.isMounted = !1, g.isLoaded = !1, c.value = !1, o.value && (o.value.getCanvas().removeEventListener("webglcontextlost", R), u.value = !1, l.forEach((i, v) => {
        o.value.off(v.startsWith("__") ? v.substring(2) : v, i);
      }), o.value.remove());
    }
    function R() {
      f(), Z(n);
    }
    return F(n), M(f), t.expose({ map: o }), () => [
      A("div", {
        ref: a,
        style: { height: e.height, width: e.width }
      }),
      u.value && t.slots.default ? t.slots.default({}) : void 0
    ];
  },
  /**
   * Slot for controls, sources, marker and popup
   * @slot default
   */
  render() {
    return null;
  }
});
function Se(e, t, r) {
  s(
    e,
    (a) => {
      a && x.indexOf(a) === -1 || (t.value?.hasControl(r) && t.value.removeControl(r), t.value?.addControl(r, a));
    },
    { immediate: !0 }
  );
}
function B(e, t) {
  const r = m(h), a = m($), o = T();
  return o.value = e(), Se(() => t.position, r, o.value), M(
    () => a.value && r.value?.removeControl(o.value)
  ), { control: o, map: r };
}
const Me = d({
  name: "MglAttributionControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-right'.
     */
    position: {
      type: String,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * If true, the attribution control will always collapse when moving the map. If false, force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide. Attribution should not be collapsed if it can comfortably fit on the map. compact should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.
     */
    compact: Boolean,
    /**
     * Attributions to show in addition to any other attributions.
     */
    customAttribution: [String, Array]
  },
  setup(e) {
    B(() => new re({
      compact: e.compact,
      customAttribution: e.customAttribution
    }), e);
  },
  render() {
    return null;
  }
});
class he {
  constructor(t, r) {
    this.isAdded = t, this.container = document.createElement("div"), this.setClasses(r);
  }
  container;
  getDefaultPosition() {
    return k.TOP_LEFT;
  }
  onAdd() {
    return Z(() => this.isAdded.value = !0), this.container;
  }
  onRemove() {
    this.isAdded.value = !1, this.container.remove();
  }
  setClasses(t) {
    this.container.className = t;
  }
}
const Le = d({
  name: "MglCustomControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-left'.
     */
    position: {
      type: String,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * Set the classes on the control div
     * @since 6.1.0
     */
    class: {
      type: String,
      default: "maplibregl-ctrl maplibregl-ctrl-group"
    }
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = _(!1), { control: a } = B(() => new he(r, e.class), e);
    return s(
      () => e.class,
      () => a.value.setClasses(e.class)
    ), () => r.value ? A(oe, { to: a.value.container }, t.default?.({})) : S("custom-component");
  },
  /**
   * Slot to render the content of the control
   * @slot default
   */
  render() {
    return null;
  }
}), Oe = d({
  name: "MglFullscreenControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
      type: String,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * container is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.
     */
    container: {
      type: Object,
      default: null
    }
  },
  setup(e) {
    const { control: t, map: r } = B(() => new ne({
      container: e.container || void 0
    }), e);
    function a() {
      Z(() => r.value?.resize());
    }
    t.value.on("fullscreenstart", a), t.value.on("fullscreenend", a), M(() => {
      t.value.off("fullscreenstart", a), t.value.off("fullscreenend", a);
    });
  },
  render() {
    return null;
  }
}), Ce = d({
  name: "MglGeolocateControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
      type: String,
      default: k.TOP_RIGHT,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.
     */
    positionOptions: {
      type: Object,
      default: () => ({ enableHighAccuracy: !1, timeout: 6e3 })
    },
    /**
     * A options object to use when the map is panned and zoomed to the user's location. The default is to use a maxZoom of 15 to limit how far the map will zoom in for very accurate locations.
     */
    fitBoundsOptions: {
      type: Object,
      default: () => ({ maxZoom: 15 })
    },
    /**
     * If true the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes.
     */
    trackUserLocation: {
      type: Boolean,
      default: !1
    },
    /**
     * By default, if showUserLocation is true, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to false to disable. Always disabled when showUserLocation is false.
     */
    showAccuracyCircle: {
      type: Boolean,
      default: !0
    },
    /**
     * By default a dot will be shown on the map at the user's location. Set to false to disable.
     */
    showUserLocation: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    "trackuserlocationstart",
    "trackuserlocationend",
    "userlocationlostfocus",
    "userlocationfocus",
    "geolocate",
    "error",
    "outofmaxbounds"
  ],
  setup(e, t) {
    const { control: r } = B(() => new ie({
      positionOptions: e.positionOptions,
      fitBoundsOptions: e.fitBoundsOptions,
      trackUserLocation: e.trackUserLocation,
      showAccuracyCircle: e.showAccuracyCircle,
      showUserLocation: e.showUserLocation
    }), e);
    function a(o) {
      const u = (c) => {
        t.emit(o, c);
      };
      r.value.on(o, u), M(() => {
        r.value.off(o, u);
      });
    }
    a("trackuserlocationstart"), a("trackuserlocationend"), a("userlocationlostfocus"), a("userlocationfocus"), a("geolocate"), a("error"), a("outofmaxbounds");
  },
  render() {
    return null;
  }
}), xe = d({
  name: "MglNavigationControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
      type: String,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * If true the compass button is included.
     */
    showCompass: { type: Boolean, default: !0 },
    /**
     * If true the zoom-in and zoom-out buttons are included.
     */
    showZoom: { type: Boolean, default: !0 },
    /**
     * If true the pitch is visualized by rotating X-axis of compass.
     */
    visualizePitch: Boolean
  },
  setup(e) {
    B(() => new ue({
      showCompass: e.showCompass,
      showZoom: e.showZoom,
      visualizePitch: e.visualizePitch
    }), e);
  },
  render() {
    return null;
  }
});
var Y = /* @__PURE__ */ ((e) => (e.IMPERIAL = "imperial", e.METRIC = "metric", e.NAUTICAL = "nautical", e))(Y || {});
const Ie = Object.values(Y), ze = d({
  name: "MglScaleControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-left'.
     */
    position: {
      type: String,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * The maximum length of the scale control in pixels. Default Value `100`
     */
    maxWidth: { type: Number, default: 100 },
    /**
     * Set the scale's unit of the distance ('imperial', 'metric' or 'nautical').
     */
    unit: {
      type: String,
      default: "metric",
      validator: (e) => Ie.indexOf(e) !== -1
    }
  },
  setup(e) {
    B(() => new le({
      maxWidth: e.maxWidth,
      unit: e.unit
    }), e);
  },
  render() {
    return null;
  }
}), _e = d({
  name: "MglLogoControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'bottom-left'.
     */
    position: {
      type: String,
      validator: (e) => x.indexOf(e) !== -1
    },
    /**
     * If true, force a compact logo. If false, force the full logo. The default is a responsive logo that collapses when the map is less than 640 pixels wide.
     */
    compact: {
      type: Boolean
    }
  },
  setup(e) {
    B(() => new se({
      compact: e.compact
    }), e);
  },
  render() {
    return null;
  }
}), Be = d({
  name: "MglMarker",
  emits: [
    /**
     * Fired when dragging starts
     */
    "dragstart",
    /**
     * Fired while dragging
     */
    "drag",
    /**
     * Fired when the marker is finished being dragged
     */
    "dragend",
    /**
     * Fired when the coordinates have been updated when the marker is draggable
     *
     * @property {LgnLatLike} coordinates the new coordinates
     */
    "update:coordinates"
  ],
  props: {
    /**
     * Marker coordinates
     */
    coordinates: {
      type: [Object, Array],
      required: !0
    },
    /**
     * Space-separated CSS class names to add to marker container
     * @since 8.3.0
     */
    className: String,
    /**
     * The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up.
     */
    offset: [Object, Array],
    /**
     * A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker#setLngLat. Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Default Value 'center'
     */
    anchor: String,
    /**
     * The color to use for the default marker if options.element is not provided. The default is light blue. Default Value '#3FB1CE'
     */
    color: String,
    /**
     * A boolean indicating whether or not a marker is able to be dragged to a new position on the map. Default Value false
     */
    draggable: Boolean,
    /**
     * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. Default Value 0
     */
    clickTolerance: Number,
    /**
     * The rotation angle of the marker in degrees, relative to its respective rotationAlignment setting. A positive value will rotate the marker clockwise. Default Value 0
     */
    rotation: Number,
    /**
     * map aligns the Marker's rotation relative to the map, maintaining a bearing as the map rotates. viewport aligns the Marker's rotation relative to the viewport, agnostic to map rotations. auto is equivalent to viewport. Default Value 'auto'
     */
    rotationAlignment: String,
    /**
     * map aligns the Marker to the plane of the map. viewport aligns the Marker to the plane of the viewport. auto automatically matches the value of rotationAlignment. Default Value 'auto'
     */
    pitchAlignment: String,
    /**
     * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px. Default Value 1
     */
    scale: Number,
    /**
     * Marker's opacity when it's in clear view (not behind 3d terrain). Default value `1`
     * @since 7.0.0
     */
    opacity: String,
    /**
     * Marker's opacity when it's behind 3d terrain
     * @defaultValue `0.2`
     * @since 7.0.0
     */
    opacityWhenCovered: String,
    /**
     * If true, rounding is disabled for placement of the marker, allowing for subpixel positioning and smoother movement when the marker is translated.
     * @since 7.5.0
     */
    subpixelPositioning: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { slots: t, emit: r }) {
    const a = m(h), o = T(), u = _(), c = _(!1), l = /* @__PURE__ */ new Map();
    function g(n, f) {
      const R = (i) => {
        f && f(), r(n, i);
      };
      o.value.on(n, R), l.set(n, R);
    }
    return y(J, o), F(() => {
      const n = { ...e };
      t.marker && (n.element = u.value), o.value = new ce(n), o.value.setLngLat(e.coordinates).addTo(a.value), g("dragstart"), g("drag", () => {
        r("update:coordinates", o.value?.getLngLat());
      }), g("dragend", () => {
        r("update:coordinates", o.value?.getLngLat());
      }), c.value = !0;
    }), s(
      () => e.coordinates,
      (n) => o.value?.setLngLat(n),
      { deep: !0 }
    ), s(
      () => e.draggable,
      (n) => o.value?.setDraggable(n)
    ), s(
      () => e.offset,
      (n) => o.value?.setOffset(n || [0, 0])
    ), s(
      () => e.pitchAlignment,
      (n) => o.value?.setPitchAlignment(n || "auto")
    ), s(
      () => e.rotation,
      (n) => o.value?.setRotation(n)
    ), s(
      () => e.rotationAlignment,
      (n) => o.value?.setRotationAlignment(n || "auto")
    ), s(
      () => e.opacity,
      (n) => o.value?.setOpacity(n, e.opacityWhenCovered)
    ), s(
      () => e.opacityWhenCovered,
      (n) => o.value?.setOpacity(e.opacity, n)
    ), s(
      () => e.subpixelPositioning,
      (n) => o.value?.setSubpixelPositioning(n)
    ), s(
      () => e.className,
      (n, f) => {
        f && o.value?.removeClassName(f), n && o.value?.addClassName(n);
      }
    ), M(() => {
      l.forEach((n, f) => {
        o.value?.off(f, n);
      }), o.value?.remove();
    }), () => [
      A(
        "div",
        t.default && c.value ? t.default({}) : void 0
      ),
      A("div", { ref: u }, t.marker ? t.marker() : void 0)
    ];
  },
  /**
   * Slot for popup component
   * @slot default
   */
  /**
   * Slot for custom marker
   * @slot marker
   */
  render() {
    return null;
  }
}), Ne = d({
  name: "MglPopup",
  emits: [
    /**
     * Fired when the popup is opened manually or programmatically.
     */
    "open",
    /**
     * Fired when the popup is closed manually or programmatically.
     */
    "close"
  ],
  props: {
    /**
     * The geographical location of the popup's anchor.
     * Unused when placed inside a marker.
     */
    coordinates: {
      type: [Object, Array],
      required: !1
    },
    /**
     * Display a close button in the top right corner.
     */
    closeButton: {
      type: Boolean,
      required: !1,
      default: !0
    },
    /**
     * The popup will be closed when the map is clicked.
     */
    closeOnClick: {
      type: Boolean,
      required: !1,
      default: !0
    },
    /**
     * The popup will be closed when the map moves.
     */
    closeOnMove: {
      type: Boolean,
      required: !1,
      default: !1
    },
    /**
     * The popup will try to focus the first focusable element inside the popup.
     */
    focusAfterOpen: {
      type: Boolean,
      required: !1,
      default: !0
    },
    /**
     * A string indicating the part of the Popup that should
     * be positioned closest to the coordinate.
     * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`,
     * `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset the anchor will be
     * dynamically set to ensure the popup falls within the map container with a preference
     * for `'bottom'`.
     */
    anchor: {
      type: String,
      required: !1
    },
    /**
     * A pixel offset applied to the popup's location
     */
    offset: {
      type: [Number, Object, Array],
      required: !1
    },
    /**
     * Space-separated CSS class names to add to popup container
     */
    className: {
      type: String,
      required: !1
    },
    /**
     * A string that sets the CSS property of the popup's maximum width, eg `'300px'`.
     * To ensure the popup resizes to fit its content, set this property to `'none'`.
     */
    maxWidth: {
      type: String,
      default: "240px"
    },
    /**
     * If true, rounding is disabled for placement of the popup, allowing for subpixel positioning and smoother movement when the popup is translated.
     * @since 7.1.0
     */
    subpixelPositioning: {
      type: Boolean,
      default: !1
    },
    /**
     * Sets the popup's content to a string of text.
     */
    text: {
      type: String,
      required: !1
    }
  },
  setup(e, { slots: t, emit: r, expose: a }) {
    const o = m(h), u = m(J, void 0), c = _(), l = new de(e);
    u && u.value ? u.value.setPopup(l) : e.coordinates && o && l.setLngLat(e.coordinates).addTo(o.value), e.text && l.setText(e.text);
    function g(n) {
      const f = () => r(n);
      l.on(n, f), M(() => {
        l.off(n, f);
      });
    }
    return g("open"), g("close"), a({
      remove() {
        l.remove();
      }
    }), s(
      () => e.coordinates,
      (n) => {
        n && l.setLngLat(n);
      },
      { deep: !0 }
    ), s(
      () => e.text,
      (n) => l.setText(n || "")
    ), s(
      () => e.offset,
      (n) => l.setOffset(n)
    ), s(
      () => e.maxWidth,
      (n) => l.setMaxWidth(n)
    ), s(
      () => e.className,
      (n, f) => {
        f && l.removeClassName(f), n && l.addClassName(n);
      }
    ), s(
      () => e.subpixelPositioning,
      (n) => l.setSubpixelPositioning(n)
    ), F(() => {
      c.value && !e.text && l.setDOMContent(c.value);
    }), M(() => {
      l.remove();
    }), () => [
      A("div", { ref: c }, t.default ? t.default() : void 0)
    ];
  },
  /**
   * Slot for popup content
   * @slot default
   */
  render() {
    return null;
  }
}), je = d({
  name: "MglImage",
  props: {
    /**
     * Image id
     */
    id: {
      type: String,
      required: !0
    },
    /**
     * The image data to add
     * The image as an HTMLImageElement, ImageData, ImageBitmap or object with width, height, and data properties with the same format as ImageData.
     * Required if the url props is not set
     */
    image: Object,
    /**
     * The image url to load via map#loadImage
     * Required if the image props is not set
     */
    url: String,
    /**
     * The options
     */
    options: Object
  },
  setup(e) {
    const t = m(h);
    if (!e.url && !e.image)
      return D(`${e.id} image: missing prop url or image`), () => [];
    if (!t.value.hasImage(e.id))
      return (async () => {
        let r = e.image;
        e.url && (r = (await t.value.loadImage(e.url)).data), t.value.addImage(e.id, r, e.options);
      })(), () => [];
  }
});
class N {
  unmountHandlers = /* @__PURE__ */ new Map();
  registerUnmountHandler(t, r) {
    this.unmountHandlers.set(t, r);
  }
  unregisterUnmountHandler(t) {
    this.unmountHandlers.delete(t);
  }
  unmount() {
    this.unmountHandlers.forEach((t) => t());
  }
}
class b {
  static REFS = /* @__PURE__ */ new Map();
  static genSourceOpts(t) {
    const r = { ...t };
    for (const a of Object.keys(r))
      (r[a] === void 0 || a === "sourceId") && delete r[a];
    return r;
  }
  static getSourceRef(t, r) {
    const a = typeof r == "string", o = String(t) + (a ? r : "");
    let u = b.REFS.get(o);
    return u || (u = _(a ? null : void 0), b.REFS.set(o, u)), u;
  }
}
function j(e, t, r) {
  const a = m(h), o = m(P);
  function u() {
    o.value && !a.value?.getSource(t.sourceId) && (a.value.addSource(t.sourceId, b.genSourceOpts(t)), e.value = a.value.getSource(t.sourceId));
  }
  return s(o, u, { immediate: !0 }), a.value.on("styledata", u), M(() => {
    o.value && a.value?.getSource(t.sourceId) && (r.unmount(), a.value.removeSource(t.sourceId)), a.value.off("styledata", u), e.value = void 0;
  });
}
const we = d({
  name: "MglCanvasSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    coordinates: Array,
    animate: Boolean,
    canvas: [Object, String]
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "canvas" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), s(
      [
        w(e.coordinates) ? e.coordinates : () => e.coordinates,
        a
      ],
      ([c, l]) => {
        l?.setCoordinates(c);
      },
      { immediate: !0 }
    ), () => [
      S("Canvas Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), Re = d({
  name: "MglGeoJsonSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    data: {
      type: [Object, String],
      required: !0
    },
    maxzoom: Number,
    attribution: String,
    buffer: Number,
    tolerance: Number,
    cluster: Boolean,
    clusterRadius: Number,
    clusterMaxZoom: Number,
    clusterMinPoints: Number,
    clusterProperties: Object,
    lineMetrics: Boolean,
    generateId: Boolean,
    promoteId: [Object, String],
    filter: [Array, String, Object]
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "geojson" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), s(
      [w(e.data) ? e.data : () => e.data, a],
      ([c, l]) => {
        l?.loaded() && l?.setData(
          c || { type: "FeatureCollection", features: [] }
        );
      },
      { immediate: !0 }
    ), () => [
      S("GeoJSON Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), Ae = d({
  name: "MglImageSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    url: String,
    coordinates: Array
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "image" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), s(
      [
        w(e.coordinates) ? e.coordinates : () => e.coordinates,
        a
      ],
      ([c, l]) => {
        l?.setCoordinates(c);
      },
      { immediate: !0 }
    ), () => [
      S("Image Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), Pe = d({
  name: "MglRasterSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    url: String,
    tiles: Array,
    bounds: Array,
    minzoom: Number,
    maxzoom: Number,
    tileSize: Number,
    scheme: String,
    attribution: String,
    volatile: Boolean
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "raster" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), () => [
      S("Raster Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), ke = d({
  name: "MglRasterDemSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    url: String,
    tiles: Array,
    bounds: Array,
    minzoom: Number,
    maxzoom: Number,
    tileSize: Number,
    attribution: String,
    encoding: String,
    volatile: Boolean,
    redFactor: Number,
    blueFactor: Number,
    greenFactor: Number,
    baseShift: Number
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "raster-dem" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), () => [
      S("RasterDem Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), Ee = d({
  name: "MglVectorSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    url: String,
    tiles: Array,
    bounds: {
      type: Array,
      validator: function(e) {
        return e.length === 4;
      }
    },
    scheme: String,
    minzoom: Number,
    maxzoom: Number,
    attribution: String,
    promoteId: [Object, String],
    volatile: Boolean
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "vector" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), s(
      [w(e.tiles) ? e.tiles : () => e.tiles, a],
      ([c, l]) => {
        l?.loaded() && l.setTiles(c || []);
      },
      { immediate: !0 }
    ), s(
      [w(e.url) ? e.url : () => e.url, a],
      ([c, l]) => {
        l?.loaded() && l.setUrl(c || "");
      },
      { immediate: !0 }
    ), () => [
      S("Vector Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), Te = d({
  name: "MglVideoSource",
  props: {
    sourceId: {
      type: String,
      required: !0
    },
    urls: Array,
    coordinates: Array
  },
  slots: Object,
  setup(e, { slots: t }) {
    const r = m(L), a = b.getSourceRef(r, e.sourceId), o = new N(), u = { ...e, type: "video" };
    return y(O, e.sourceId), y(C, o), j(a, u, o), s(
      [
        w(e.coordinates) ? e.coordinates : () => e.coordinates,
        a
      ],
      ([c, l]) => {
        l?.setCoordinates(c);
      },
      { immediate: !0 }
    ), () => [
      S("Video Source"),
      a.value && t.default ? t.default({}) : void 0
    ];
  }
}), p = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "contextmenu",
  "touchstart",
  "touchend",
  "touchcancel"
];
function I() {
  return {
    /**
     * The id of the layer
     */
    layerId: {
      type: String,
      required: !0
    },
    source: {
      type: String
    },
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: {
      type: [Object, Array, String, Number]
    },
    /**
     * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
     */
    sourceLayer: { type: String },
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: { type: Number },
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: { type: Number },
    /**
     * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
     */
    filter: { type: Object },
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: { type: String },
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    layout: { type: Object },
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/
     */
    paint: { type: Object }
  };
}
function qe(e, t, r, a) {
  const o = {
    id: e,
    type: t,
    source: r.source || a,
    metadata: r.metadata,
    minzoom: r.minzoom,
    maxzoom: r.maxzoom,
    "source-layer": r.sourceLayer,
    filter: r.filter,
    paint: r.paint,
    layout: r.layout
  };
  for (const u of Object.keys(o))
    o[u] === void 0 && delete o[u];
  return o;
}
const E = {};
function Q(e, t, r) {
  return `${e._getMapId()}:${t}:${r}`;
}
function X(e, t, r) {
  const a = Q(e, t, r);
  a in E && (E[a].unsubscribe(), delete E[a]);
}
function Fe(e, t, r, a) {
  X(e, t, r), E[Q(e, t, r)] = a;
}
function Ze(e, t, r) {
  if (r.props)
    for (const a of p) {
      const o = "on" + a.charAt(0).toUpperCase() + a.substring(1);
      r.props[o] && Fe(
        e,
        t,
        a,
        e.on(a, t, r.props[o])
      );
    }
}
function He(e, t, r) {
  if (r.props)
    for (const a of p)
      X(e, t, a);
}
function ee(e, t) {
  const r = m(h), a = m(P), o = m(C);
  function u() {
    a.value && (t && He(r.value, e, t.vnode), r.value.getLayer(e) && r.value.removeLayer(e));
  }
  o.registerUnmountHandler(e, u), M(() => {
    o.unregisterUnmountHandler(e), u();
  });
}
const We = d({
  name: "MglBackgroundLayer",
  props: {
    /**
     * The id of the layer
     */
    layerId: {
      type: String,
      required: !0
    },
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: [Object, Array, String, Number],
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: Number,
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: Number,
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: String,
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/#background
     */
    layout: Object,
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/#background
     */
    paint: Object
  },
  emits: [...p],
  setup(e) {
    const t = m(h), r = m(P);
    return ee(e.layerId), s(
      () => e.layout,
      (a) => {
        if (a)
          for (const [o, u] of Object.entries(a))
            t.value.setLayoutProperty(e.layerId, o, u);
      }
    ), s(
      () => e.paint,
      (a) => {
        if (a)
          for (const [o, u] of Object.entries(a))
            t.value.setPaintProperty(e.layerId, o, u);
      }
    ), s(
      r,
      (a) => {
        a && t.value.addLayer(
          {
            id: e.layerId,
            type: "background",
            metadata: e.metadata,
            minzoom: e.minzoom,
            maxzoom: e.maxzoom,
            layout: e.layout,
            paint: e.paint
          },
          e.before || void 0
        );
      },
      { immediate: !0 }
    ), () => S("Background Layer");
  }
});
function z(e, t) {
  const r = m(O);
  if (!r && !t.source) {
    D(
      `${e} Layer: layer must be used inside source tag or source prop must be set`
    );
    return;
  }
  const a = G(), o = m(h), u = m(P), c = m(L), l = b.getSourceRef(c, t.source || r);
  return ee(t.layerId, a), s(
    () => t.minzoom,
    () => o.value.setLayerZoomRange(
      t.layerId,
      t.minzoom || 0,
      t.maxzoom || 24
    )
  ), s(
    () => t.maxzoom,
    () => o.value.setLayerZoomRange(
      t.layerId,
      t.minzoom || 0,
      t.maxzoom || 24
    )
  ), s(
    () => t.layout,
    (g) => {
      if (g)
        for (const [n, f] of Object.entries(g))
          o.value.setLayoutProperty(t.layerId, n, f);
    },
    { deep: !0 }
  ), s(
    () => t.paint,
    (g) => {
      if (g)
        for (const [n, f] of Object.entries(g))
          o.value.setPaintProperty(t.layerId, n, f);
    },
    { deep: !0 }
  ), s(
    () => t.filter,
    (g) => o.value.setFilter(t.layerId, g),
    { deep: !0 }
  ), s(
    [u, l],
    ([g, n]) => {
      g && (n || n === void 0) && (o.value.addLayer(
        qe(t.layerId, e, t, r),
        t.before || void 0
      ), Ze(o.value, t.layerId, a.vnode));
    },
    { immediate: !0 }
  ), () => S(`${e} Layer`);
}
const Ue = d({
  name: "MglCircleLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("circle", e);
  }
}), Ve = d({
  name: "MglFillLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("fill", e);
  }
}), Ge = d({
  name: "MglFillExtrusionLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("fill-extrusion", e);
  }
}), De = d({
  name: "MglHeatmapLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("heatmap", e);
  }
}), $e = d({
  name: "MglHillshadeLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("hillshade", e);
  }
}), Je = d({
  name: "MglLineLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("line", e);
  }
}), Ke = d({
  name: "MglRasterLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("raster", e);
  }
}), Ye = d({
  name: "MglSymbolLayer",
  props: I(),
  emits: [...p],
  setup(e) {
    return z("symbol", e);
  }
}), Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MglAttributionControl: Me,
  MglBackgroundLayer: We,
  MglCanvasSource: we,
  MglCircleLayer: Ue,
  MglCustomControl: Le,
  MglFillExtrusionLayer: Ge,
  MglFillLayer: Ve,
  MglFullscreenControl: Oe,
  MglGeoJsonSource: Re,
  MglGeolocateControl: Ce,
  MglHeatmapLayer: De,
  MglHillshadeLayer: $e,
  MglImage: je,
  MglImageSource: Ae,
  MglLineLayer: Je,
  MglLogoControl: _e,
  MglMap: pe,
  MglMarker: Be,
  MglNavigationControl: xe,
  MglPopup: Ne,
  MglRasterDemSource: ke,
  MglRasterLayer: Ke,
  MglRasterSource: Pe,
  MglScaleControl: ze,
  MglSymbolLayer: Ye,
  MglVectorSource: Ee,
  MglVideoSource: Te
}, Symbol.toStringTag, { value: "Module" })), ot = function(t) {
  Object.entries(Qe).forEach(([r, a]) => {
    t.component(r, a);
  });
};
export {
  Me as MglAttributionControl,
  We as MglBackgroundLayer,
  we as MglCanvasSource,
  Ue as MglCircleLayer,
  Le as MglCustomControl,
  Ge as MglFillExtrusionLayer,
  Ve as MglFillLayer,
  Oe as MglFullscreenControl,
  Re as MglGeoJsonSource,
  Ce as MglGeolocateControl,
  De as MglHeatmapLayer,
  $e as MglHillshadeLayer,
  je as MglImage,
  Ae as MglImageSource,
  Je as MglLineLayer,
  _e as MglLogoControl,
  pe as MglMap,
  Be as MglMarker,
  xe as MglNavigationControl,
  Ne as MglPopup,
  ke as MglRasterDemSource,
  Ke as MglRasterLayer,
  Pe as MglRasterSource,
  ze as MglScaleControl,
  Ye as MglSymbolLayer,
  Ee as MglVectorSource,
  Te as MglVideoSource,
  k as Position,
  L as componentIdSymbol,
  ot as default,
  ge as isInitialized,
  $ as isInitializedSymbol,
  P as isLoadedSymbol,
  me as map,
  h as mapSymbol,
  J as markerSymbol,
  O as sourceIdSymbol,
  C as sourceLayerRegistry,
  B as useControl,
  ee as useDisposableLayer,
  tt as useMap,
  Se as usePositionWatcher,
  j as useSource
};
//# sourceMappingURL=vue-maplibre-gl.es.js.map
