import {
  defineComponent,
  inject,
  onMounted,
  type PropType,
  unref,
  watch,
  ref,
  h,
} from "vue";
import {
  type LngLatLike,
  Popup,
  type Offset,
  type PositionAnchor,
  type PopupOptions,
} from "maplibre-gl";
import { MapLib } from "@/lib/lib/map.lib";
import { mapSymbol, markerSymbol } from "@/lib/types";

/**
 * A popup component
 *
 * See [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/).
 */
export default defineComponent({
  name: "MglPopup",
  emits: [
    /**
     * Fired when the popup is opened manually or programmatically.
     */
    "open",
    /**
     * Fired when the popup is closed manually or programmatically.
     */
    "close",
  ],
  props: {
    /**
     * The geographical location of the popup's anchor.
     * Unused when placed inside a marker.
     */
    coordinates: {
      type: [Object, Array] as unknown as PropType<LngLatLike>,
      required: false,
    },
    /**
     * Display a close button in the top right corner.
     */
    closeButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * The popup will be closed when the map is clicked.
     */
    closeOnClick: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * The popup will be closed when the map moves.
     */
    closeOnMove: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The popup will try to focus the first focusable element inside the popup.
     */
    focusAfterOpen: {
      type: Boolean,
      required: false,
      default: true,
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
      type: String as PropType<PositionAnchor>,
      required: false,
    },
    /**
     * A pixel offset applied to the popup's location
     */
    offset: {
      type: [Number, Object, Array] as PropType<Offset>,
      required: false,
    },
    /**
     * Space-separated CSS class names to add to popup container
     */
    className: {
      type: String,
      required: false,
    },
    /**
     * A string that sets the CSS property of the popup's maximum width, eg `'300px'`.
     * To ensure the popup resizes to fit its content, set this property to `'none'`.
     */
    maxWidth: {
      type: String,
      default: "240px",
    },
    /**
     * Sets the popup's content to a string of text.
     */
    text: {
      type: String,
      required: false,
    },
  },
  setup(props, { slots, emit }) {
    const map = inject(mapSymbol);
    const marker = inject(markerSymbol);
    const root = ref();

    const opts: PopupOptions = Object.keys(props)
      .filter(
        (opt) =>
          (props as any)[opt] !== undefined &&
          MapLib.POPUP_OPTION_KEYS.indexOf(opt as keyof PopupOptions) !== -1,
      )
      .reduce((obj, opt) => {
        (obj as any)[opt] = unref((props as any)[opt]);
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

    popup.on("open", () => emit("open"));
    popup.on("close", () => emit("close"));

    watch(
      () => props.coordinates,
      (v) => {
        if (v) {
          popup.setLngLat(v);
        }
      },
    );
    watch(
      () => props.text,
      (v) => popup.setText(v || ""),
    );
    watch(
      () => props.offset,
      (v) => popup.setOffset(v),
    );
    watch(
      () => props.maxWidth,
      (v) => popup.setMaxWidth(v),
    );

    onMounted(() => {
      if (root.value && !props.text) {
        popup.setDOMContent(root.value!);
      }
    });

    return () => [
      h("div", { ref: root }, slots.default ? slots.default() : undefined),
    ];
  },
  /**
   * Slot for popup content
   * @slot default
   */
  render() {
    return null;
  },
});
