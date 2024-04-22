import { defineComponent, inject, provide, onBeforeUnmount, type PropType, unref, watch, shallowRef, h } from 'vue';
import { type LngLatLike, Marker, type MarkerOptions, type PointLike, type PositionAnchor } from 'maplibre-gl';
import { MapLib } from '@/lib/lib/map.lib';
import { mapSymbol, markerSymbol } from '@/lib/types';

export default /*#__PURE__*/ defineComponent({
  name : 'MglMarker',
  props: {
    coordinates: {
      type    : [ Object, Array ] as unknown as PropType<LngLatLike>,
      required: true
    },
    offset     : [ Object, Array ] as PropType<PointLike>,
    anchor     : String as PropType<PositionAnchor>,
    color      : String as PropType<string>,
    // draggable        : Boolean as PropType<boolean>, todo implement feature
    clickTolerance   : Number as PropType<number>,
    rotation         : Number as PropType<number>,
    rotationAlignment: String as PropType<'map' | 'viewport' | 'auto'>,
    pitchAlignment   : String as PropType<'map' | 'viewport' | 'auto'>,
    scale            : Number as PropType<number>
  },
  setup(props, { slots }) {

    const map                = inject(mapSymbol)!,
         opts: MarkerOptions = Object.keys(props)
      .filter(opt => (props as any)[ opt ] !== undefined && MapLib.MARKER_OPTION_KEYS.indexOf(opt as keyof MarkerOptions) !== -1)
      .reduce((obj, opt) => {
	(obj as any)[ opt ] = unref((props as any)[ opt ]);
	return obj;
      }, {});

    const marker = new Marker(opts);
    marker.setLngLat(props.coordinates).addTo(map.value!);
    provide(markerSymbol, shallowRef(marker));

    watch(() => props.coordinates, v => marker.setLngLat(v));
    // watch(() => props.draggable, v => marker.setDraggable(v || false));
    watch(() => props.offset, v => marker.setOffset(v || [ 0, 0 ]));
    watch(() => props.pitchAlignment, v => marker.setPitchAlignment(v || 'auto'));
    watch(() => props.rotationAlignment, v => marker.setRotationAlignment(v || 'auto'));

    onBeforeUnmount(marker.remove.bind(marker));

    return () => [
      h('div', slots.default ? slots.default({}) : undefined)
    ];
  }
});
