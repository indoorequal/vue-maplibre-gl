import {
  defineComponent,
  inject,
  provide,
  onMounted,
  onBeforeUnmount,
  type PropType,
  ref,
  watch,
  shallowRef,
  h,
} from "vue";
import {
  type LngLatLike,
  Marker,
  type PointLike,
  type PositionAnchor,
} from "maplibre-gl";
import { mapSymbol, markerSymbol } from "@/lib/types";

/**
 * Creates a marker component
 *
 * See [Marker](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker).
 */
export default defineComponent({
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
     * Fired when the coordinates have been updated
     *
     * @property {LgnLatLike} coordinates the new coordinates
     */
    "update:coordinates",
  ],
  props: {
    /**
     * Marker coordinates
     */
    coordinates: {
      type: [Object, Array] as unknown as PropType<LngLatLike>,
      required: true,
    },
    /**
     * The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up.
     */
    offset: [Object, Array] as PropType<PointLike>,
    /**
     * A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker#setLngLat. Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Default Value 'center'
     */
    anchor: String as PropType<PositionAnchor>,
    /**
     * The color to use for the default marker if options.element is not provided. The default is light blue. Default Value '#3FB1CE'
     */
    color: String as PropType<string>,
    /**
     * A boolean indicating whether or not a marker is able to be dragged to a new position on the map. Default Value false
     */
    draggable: Boolean as PropType<boolean>,
    /**
     * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. Default Value 0
     */
    clickTolerance: Number as PropType<number>,
    /**
     * The rotation angle of the marker in degrees, relative to its respective rotationAlignment setting. A positive value will rotate the marker clockwise. Default Value 0
     */
    rotation: Number as PropType<number>,
    /**
     * map aligns the Marker's rotation relative to the map, maintaining a bearing as the map rotates. viewport aligns the Marker's rotation relative to the viewport, agnostic to map rotations. auto is equivalent to viewport. Default Value 'auto'
     */
    rotationAlignment: String as PropType<"map" | "viewport" | "auto">,
    /**
     * map aligns the Marker to the plane of the map. viewport aligns the Marker to the plane of the viewport. auto automatically matches the value of rotationAlignment. Default Value 'auto'
     */
    pitchAlignment: String as PropType<"map" | "viewport" | "auto">,
    /**
     * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px. Default Value 1
     */
    scale: Number as PropType<number>,
    /**
     * Marker's opacity when it's in clear view (not behind 3d terrain). Default value `1`
     * @since 7.0.0
     */
    opacity: String as PropType<string>,
    /**
     * Marker's opacity when it's behind 3d terrain
     * @defaultValue `0.2`
     * @since 7.0.0
     */
    opacityWhenCovered: String as PropType<string>,
  },
  setup(props, { slots, emit }) {
    const map = inject(mapSymbol)!,
      marker = shallowRef<Marker>(),
      markerRoot = ref(),
      isMounted = ref(false),
      boundEvents = new Map();

    function emitEvent(
      eventName: "dragstart" | "drag" | "dragend",
      additionalCb?: () => void,
    ) {
      const fn = () => {
        if (additionalCb) additionalCb();
        emit(eventName);
      };
      marker.value!.on(eventName, fn);
      boundEvents.set(eventName, fn);
    }

    provide(markerSymbol, marker);

    onMounted(() => {
      const opts: typeof props & { element?: HTMLElement } = { ...props };
      if (slots.marker) {
        opts.element = markerRoot.value!;
      }
      marker.value = new Marker(opts);
      marker.value.setLngLat(props.coordinates).addTo(map.value!);

      emitEvent("dragstart");
      emitEvent("drag", () => {
        emit("update:coordinates", marker.value?.getLngLat());
      });
      emitEvent("dragend", () => {
        emit("update:coordinates", marker.value?.getLngLat());
      });

      isMounted.value = true;
    });

    watch(
      () => props.coordinates,
      (v) => marker.value?.setLngLat(v),
    );
    watch(
      () => props.draggable,
      (v) => marker.value?.setDraggable(v),
    );
    watch(
      () => props.offset,
      (v) => marker.value?.setOffset(v || [0, 0]),
    );
    watch(
      () => props.pitchAlignment,
      (v) => marker.value?.setPitchAlignment(v || "auto"),
    );
    watch(
      () => props.rotation,
      (v) => marker.value?.setRotation(v),
    );
    watch(
      () => props.rotationAlignment,
      (v) => marker.value?.setRotationAlignment(v || "auto"),
    );
    watch(
      () => props.opacity,
      (v) => marker.value?.setOpacity(v, props.opacityWhenCovered),
    );
    watch(
      () => props.opacityWhenCovered,
      (v) => marker.value?.setOpacity(props.opacity, v),
    );

    onBeforeUnmount(() => {
      boundEvents.forEach((fn, eventName) => {
        marker.value?.off(eventName, fn);
      });
      marker.value?.remove();
    });

    return () => [
      h(
        "div",
        slots.default && isMounted.value ? slots.default({}) : undefined,
      ),
      h("div", { ref: markerRoot }, slots.marker ? slots.marker() : undefined),
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
  },
});
