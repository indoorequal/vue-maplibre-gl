import {
  defineComponent,
  getCurrentInstance,
  h,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  type PropType,
  provide,
  ref,
  shallowRef,
  type SlotsType,
  unref,
  watch
} from 'vue';
import {
  type FitBoundsOptions,
  type GestureOptions,
  type LngLatBoundsLike,
  type LngLatLike,
  Map as MaplibreMap,
  type MapOptions,
  type RequestTransformFunction,
  type StyleSpecification
} from 'maplibre-gl';
import {
  componentIdSymbol,
  emitterSymbol,
  isInitializedSymbol,
  isLoadedSymbol,
  mapSymbol,
  type MglEvents,
  sourceIdSymbol,
  type ValidLanguages
} from '@/lib/types';
import { defaults } from '@/lib/defaults';
import { MapLib } from '@/lib/lib/map.lib';
import { Position } from '@/lib/components/controls/position.enum';
import mitt from 'mitt';
import { registerMap } from '@/lib/lib/mapRegistry';
import { debounce } from '@/lib/lib/debounce';
import { setPrimaryLanguage } from 'modular-maptiler-sdk/src/language';

export default /*#__PURE__*/ defineComponent({
  name : 'MglMap',
  props: {
    width                       : { type: [ Number, String ] as PropType<number | string>, default: '100%' },
    height                      : { type: [ Number, String ] as PropType<number | string>, default: '100%' },
    antialias                   : { type: Boolean as PropType<boolean>, default: () => defaults.antialias },
    attributionControl          : { type: Boolean as PropType<boolean>, default: () => defaults.attributionControl },
    bearing                     : { type: Number as PropType<number>, default: () => defaults.bearing },
    bearingSnap                 : { type: Number as PropType<number>, default: () => defaults.bearingSnap },
    bounds                      : { type: [ Array, Object ] as PropType<LngLatBoundsLike>, default: () => defaults.bounds },
    boxZoom                     : { type: Boolean as PropType<boolean>, default: () => defaults.boxZoom },
    center                      : { type: [ Array, Object ] as PropType<LngLatLike>, default: () => defaults.center },
    clickTolerance              : { type: Number as PropType<number>, default: () => defaults.clickTolerance },
    collectResourceTiming       : { type: Boolean as PropType<boolean>, default: () => defaults.collectResourceTiming },
    crossSourceCollisions       : { type: Boolean as PropType<boolean>, default: () => defaults.crossSourceCollisions },
    customAttribution           : { type: [ String, Array ] as PropType<string | string[]>, default: () => defaults.customAttribution },
    dragPan                     : { type: Boolean as PropType<boolean>, default: () => defaults.dragPan },
    dragRotate                  : { type: Boolean as PropType<boolean>, default: () => defaults.dragRotate },
    doubleClickZoom             : { type: Boolean as PropType<boolean>, default: () => defaults.doubleClickZoom },
    hash                        : { type: [ Boolean, String ] as PropType<boolean | string>, default: () => defaults.hash },
    fadeDuration                : { type: Number as PropType<number>, default: () => defaults.fadeDuration },
    failIfMajorPerformanceCaveat: { type: Boolean as PropType<boolean>, default: () => defaults.failIfMajorPerformanceCaveat },
    fitBoundsOptions            : { type: Object as PropType<FitBoundsOptions>, default: () => defaults.fitBoundsOptions },
    interactive                 : { type: Boolean as PropType<boolean>, default: () => defaults.interactive },
    keyboard                    : { type: Boolean as PropType<boolean>, default: () => defaults.keyboard },
    locale                      : { type: Object as PropType<Record<string, string>>, default: () => defaults.locale },
    language                    : { type: String as PropType<ValidLanguages | null>, default: () => defaults.language || null },
    localIdeographFontFamily    : { type: String as PropType<string>, default: () => defaults.localIdeographFontFamily },
    logoPosition                : {
      type     : [ String ] as PropType<Position>,
      validator: (val: any) => val in Position,
      default  : () => defaults.logoPosition,
    },
    maxBounds                   : { type: [ Array, Object ] as PropType<LngLatBoundsLike>, default: () => defaults.maxBounds },
    maxPitch                    : { type: Number as PropType<number>, default: () => defaults.maxPitch },
    maxZoom                     : { type: Number as PropType<number>, default: () => defaults.maxZoom },
    minPitch                    : { type: Number as PropType<number>, default: () => defaults.minPitch },
    minZoom                     : { type: Number as PropType<number>, default: () => defaults.minZoom },
    preserveDrawingBuffer       : { type: Boolean as PropType<boolean>, default: () => defaults.preserveDrawingBuffer },
    pitch                       : { type: Number as PropType<number>, default: () => defaults.pitch },
    pitchWithRotate             : { type: Boolean as PropType<boolean>, default: () => defaults.pitchWithRotate },
    refreshExpiredTiles         : { type: Boolean as PropType<boolean>, default: () => defaults.refreshExpiredTiles },
    renderWorldCopies           : { type: Boolean as PropType<boolean>, default: () => defaults.renderWorldCopies },
    scrollZoom                  : { type: Boolean as PropType<boolean>, default: () => defaults.scrollZoom },
    // StyleSpecification triggers TS7056, so users must handle typings themselves
    mapStyle           : { type: [ String, Object ] as PropType<object | string>, default: () => defaults.style },
    trackResize        : { type: Boolean as PropType<boolean>, default: () => defaults.trackResize },
    transformRequest   : { type: Function as PropType<RequestTransformFunction>, default: defaults.transformRequest },
    touchZoomRotate    : { type: Boolean as PropType<boolean>, default: () => defaults.touchZoomRotate },
    touchPitch         : { type: Boolean as PropType<boolean>, default: () => defaults.touchPitch },
    zoom               : { type: Number as PropType<number>, default: () => defaults.zoom },
    maxTileCacheSize   : { type: Number as PropType<number>, default: () => defaults.maxTileCacheSize },
    mapKey             : { type: [ String, Symbol ] as PropType<string | symbol> },
    pixelRatio         : { type: Number as PropType<number>, default: () => defaults.pixelRatio },
    cooperativeGestures: { type: [ Boolean, Object ] as PropType<boolean | GestureOptions>, default: () => defaults.cooperativeGestures }
  },
  emits: [
    'map:error', 'map:load', 'map:idle', 'map:remove', 'map:render', 'map:resize', 'map:webglcontextlost', 'map:webglcontextrestored', 'map:dataloading',
    'map:data', 'map:tiledataloading', 'map:sourcedataloading', 'map:styledataloading', 'map:sourcedata', 'map:styledata', 'map:boxzoomcancel',
    'map:boxzoomstart', 'map:boxzoomend', 'map:touchcancel', 'map:touchmove', 'map:touchend', 'map:touchstart', 'map:click', 'map:contextmenu',
    'map:dblclick', 'map:mousemove', 'map:mouseup', 'map:mousedown', 'map:mouseout', 'map:mouseover', 'map:movestart', 'map:move', 'map:moveend',
    'map:zoomstart', 'map:zoom', 'map:zoomend', 'map:rotatestart', 'map:rotate', 'map:rotateend', 'map:dragstart', 'map:drag', 'map:dragend',
    'map:pitchstart', 'map:pitch', 'map:pitchend', 'map:wheel'
  ],
  slots: Object as SlotsType<{ default: {} }>,
  setup(props, ctx) {

    const component      = markRaw(getCurrentInstance()!),
    container      = shallowRef<HTMLDivElement>(),
    map            = shallowRef<MaplibreMap>(),
    isInitialized  = ref(false),
    isLoaded       = ref(false),
    isStyleReady   = ref(false),
    boundMapEvents = new Map<string, Function>(),
    emitter        = mitt<MglEvents>(),
    registryItem   = registerMap(component as any, map, props.mapKey);

    let resizeObserver: ResizeObserver | undefined;

    provide(mapSymbol, map);
    provide(isLoadedSymbol, isLoaded);
    provide(isInitializedSymbol, isInitialized);
    provide(componentIdSymbol, component.uid);
    provide(sourceIdSymbol, '');
    provide(emitterSymbol, emitter);

    /*
     * bind prop watchers
     */
    watch(() => props.bearing, v => {
      if (v) {
	map.value?.setBearing(v);
      }
    });
    watch(() => props.bounds, v => {
      if (v) {
	map.value?.fitBounds(v, props.fitBoundsOptions);
      }
    });
    watch(() => props.center, v => {
      if (v) {
	map.value?.setCenter(v);
      }
    });
    watch(() => props.maxBounds, v => {
      if (v) {
	map.value?.setMaxBounds(v);
      }
    });
    watch(() => props.maxPitch, v => {
      if (v) {
	map.value?.setMaxPitch(v);
      }
    });
    watch(() => props.maxZoom, v => {
      if (v) {
	map.value?.setMaxZoom(v);
      }
    });
    watch(() => props.minPitch, v => {
      if (v) {
	map.value?.setMinPitch(v);
      }
    });
    watch(() => props.minZoom, v => {
      if (v) {
	map.value?.setMinZoom(v);
      }
    });
    watch(() => props.pitch, v => {
      if (v) {
	map.value?.setPitch(v);
      }
    });
    watch(() => props.renderWorldCopies, v => {
      if (v) {
	map.value?.setRenderWorldCopies(v);
      }
    });
    watch(() => props.mapStyle, v => {
      if (v) {
	map.value?.setStyle(v as StyleSpecification);
      }
    });
    watch(() => props.transformRequest, v => {
      if (v) {
	map.value?.setTransformRequest(v);
      }
    });
    watch(() => props.zoom, v => {
      if (v) {
	map.value?.setZoom(v);
      }
    });
    watch(() => props.zoom, v => {
      if (v) {
	map.value?.setZoom(v);
      }
    });
    watch(() => props.language, v => {
      if (isStyleReady.value && map.value && registryItem.language !== (v || null)) {
	setPrimaryLanguage(map.value as any, v || '');
	registryItem.language = v || null;
      }
    });
    watch(() => registryItem.language, v => {
      if (isStyleReady.value && map.value) {
	setPrimaryLanguage(map.value as any, v || '');
      }
    });

    function onStyleReady() {
      isStyleReady.value = true;
      if (props.language) {
	registryItem.language = props.language;
      } else if (registryItem.language) {
	setPrimaryLanguage(map.value! as any, props.language || '');
      }
    }

    function initialize() {

      registryItem.isMounted = true;

      // build options
      const opts: MapOptions = Object.keys(props)
	.filter(opt => (props as any)[ opt ] !== undefined && MapLib.MAP_OPTION_KEYS.indexOf(opt as keyof MapOptions) !== -1)
	.reduce<MapOptions>((obj, opt) => {
	  (obj as any)[ opt === 'mapStyle' ? 'style' : opt ] = unref((props as any)[ opt ]);
	  return obj;
	}, { container: container.value as HTMLDivElement } as any);

      // init map
      map.value           = markRaw(new MaplibreMap(opts));
      registryItem.map    = map.value;
      isInitialized.value = true;
      boundMapEvents.set('__load', () => (isLoaded.value = true, registryItem.isLoaded = true));
      map.value.once('styledata', onStyleReady);
      map.value.on('load', boundMapEvents.get('__load') as any);

      // bind events
      if (component.vnode.props) {
	for (let i = 0, len = MapLib.MAP_EVENT_TYPES.length; i < len; i++) {
	  if (component.vnode.props[ 'onMap:' + MapLib.MAP_EVENT_TYPES[ i ] ]) {
	    const handler = MapLib.createEventHandler(component as any, map.value, ctx as any, 'map:' + MapLib.MAP_EVENT_TYPES[ i ]);
	    boundMapEvents.set(MapLib.MAP_EVENT_TYPES[ i ], handler);
	    map.value.on(MapLib.MAP_EVENT_TYPES[ i ], handler);
	  }
	}
      }

      // automatic re-initialization of map on CONTEXT_LOST_WEBGL
      map.value.getCanvas().addEventListener('webglcontextlost', restart);

    }

    async function dispose() {

      registryItem.isMounted = false;
      registryItem.isLoaded  = false;
      isLoaded.value         = false;

      if (map.value) {
	// unbind events
	map.value.getCanvas().removeEventListener('webglcontextlost', restart);
	map.value._controls.forEach((control) => {
	  map.value!.removeControl(control);
	});
	isInitialized.value = false;
	boundMapEvents.forEach((func, en) => {
	  map.value!.off(en.startsWith('__') ? en.substring(2) : en, func as any);
	});
	// destroy map
	map.value.remove();
      }

    }

    function restart() {
      dispose();
      nextTick(initialize);
    }

    /*
     * init map
     */
    onMounted(() => {

      initialize();

      // bind resize observer
      if (map.value) {
	resizeObserver = new ResizeObserver(debounce(map.value.resize.bind(map.value), 100));
	resizeObserver.observe(container.value as HTMLDivElement);
      }

    });

    /*
     * Dispose component
     */
    onBeforeUnmount(() => {

      // unbind resize observer
      if (resizeObserver !== undefined) {
	resizeObserver.disconnect();
	resizeObserver = undefined;
      }

      dispose();

    });

    ctx.expose({ map });

    return () => h(
      'div',
      {
	'class': 'mgl-container',
	style  : { height: props.height, width: props.width }
      },
      [
	h('div', { ref: container, 'class': 'mgl-wrapper' }),
	isInitialized.value && ctx.slots.default ? ctx.slots.default({}) : undefined
      ]
    );

  }
});
