import { defineComponent, inject, onMounted, onBeforeUnmount, PropType, unref, watch, ref, h } from 'vue';
import { LngLatLike, Popup, Offset, PositionAnchor, PopupOptions, PointLike } from 'maplibre-gl';
import { MapLib } from '@/lib/lib/map.lib';
import { mapSymbol, markerSymbol } from '@/lib/types';

export default /*#__PURE__*/ defineComponent({
  name : 'MglPopup',
  emits: ['open', 'close'],
  props: {
    coordinates: {
      type: [ Object, Array ] as unknown as PropType<LngLatLike>,
      required: false
    },
    closeButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      required: false,
      default: true,
    },
    closeOnMove: {
      type: Boolean,
      required: false,
      default: false,
    },
    focusAfterOpen: {
      type: Boolean,
      required: false,
      default: true,
    },
    anchor: {
      type: String as PropType<PositionAnchor>,
      required: false
    },
    offset: {
      type: [Number, Object, Array] as PropType<Offset>,
      required: false,
    },
    className: {
      type: String,
      required: false,
    },
    maxWidth: {
      type: String,
      default: '240px',
    },
    text: {
      type: String,
      required: false
    }
  },
  setup(props, { slots, emit }) {
    const map = inject(mapSymbol);
    const marker = inject(markerSymbol);
    const root = ref();

    const opts: PopupOptions = Object.keys(props)
      .filter(opt => (props as any)[ opt ] !== undefined && MapLib.POPUP_OPTION_KEYS.indexOf(opt as keyof PopupOptions) !== -1)
      .reduce((obj, opt) => {
	(obj as any)[ opt ] = unref((props as any)[ opt ]);
	return obj;
      }, {});

    const popup = new Popup(opts);

    if (marker && marker.value) {
      marker.value.setPopup(popup);
    } else if (props.coordinates && map) {
      popup.setLngLat(props.coordinates).addTo(map.value!);
    }

    if (props.text) {
      popup.setText(props.text);
    }

    popup.on('open', () => emit('open'));
    popup.on('close', () => emit('close'));

    watch(() => props.coordinates, (v) => { if (v) { popup.setLngLat(v) } });
    watch(() => props.text, v => popup.setText(v || ''));
    watch(() => props.offset, v => popup.setOffset(v));
    watch(() => props.maxWidth, v => popup.setMaxWidth(v));

    onMounted(() => {
      if (root.value && !props.text) {
        popup.setDOMContent(root.value!);
      }
    });

    return () => [
      h('div', {ref: root}, slots.default ? slots.default() : undefined)
    ];
  },
});
