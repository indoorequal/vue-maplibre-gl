import {
  defineComponent,
  inject,
  provide,
  onBeforeUnmount,
  type PropType,
  unref,
  watch,
  shallowRef,
  h,
} from "vue";
import {
  type LngLatLike,
  Marker,
  type MarkerOptions,
  type PointLike,
  type PositionAnchor,
} from "maplibre-gl";
import { MapLib } from "@/lib/lib/map.lib";
import { mapSymbol, markerSymbol } from "@/lib/types";

export default /*#__PURE__*/ defineComponent({
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
    "dragend"
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
     * A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker#setLngLat. Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Default Value ts 'center'
     */
    anchor: String as PropType<PositionAnchor>,
    /**
     * The color to use for the default marker if options.element is not provided. The default is light blue. Default Value ts '#3FB1CE'
     */
    color: String as PropType<string>,
    /**
     * A boolean indicating whether or not a marker is able to be dragged to a new position on the map. Default Value ts false
     */
    draggable: Boolean as PropType<boolean>,
    /**
     * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. Default Value ts 0
     */
    clickTolerance: Number as PropType<number>,
    /**
     * The rotation angle of the marker in degrees, relative to its respective rotationAlignment setting. A positive value will rotate the marker clockwise. Default Value ts 0
     */
    rotation: Number as PropType<number>,
    /**
     * map aligns the Marker's rotation relative to the map, maintaining a bearing as the map rotates. viewport aligns the Marker's rotation relative to the viewport, agnostic to map rotations. auto is equivalent to viewport. Default Value ts 'auto'
     */
    rotationAlignment: String as PropType<"map" | "viewport" | "auto">,
    /**
     * map aligns the Marker to the plane of the map. viewport aligns the Marker to the plane of the viewport. auto automatically matches the value of rotationAlignment. Default Value ts 'auto'
     */
    pitchAlignment: String as PropType<"map" | "viewport" | "auto">,
    /**
     * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px. Default Value ts 1
     */
    scale: Number as PropType<number>,
  },
  setup(props, { slots, emit }) {
    const map = inject(mapSymbol)!,
      opts: MarkerOptions = Object.keys(props)
        .filter(
          (opt) =>
            (props as any)[opt] !== undefined &&
            MapLib.MARKER_OPTION_KEYS.indexOf(opt as keyof MarkerOptions) !==
              -1,
        )
        .reduce((obj, opt) => {
          (obj as any)[opt] = unref((props as any)[opt]);
          return obj;
        }, {});

    const marker = new Marker(opts);
    marker.setLngLat(props.coordinates).addTo(map.value!);
    provide(markerSymbol, shallowRef(marker));

    marker.on("dragstart", () => emit("dragstart"));
    marker.on("drag", () => emit("drag"));
    marker.on("dragend", () => emit("dragend"));

    watch(
      () => props.coordinates,
      (v) => marker.setLngLat(v),
    );
    watch(() => props.draggable, v => marker.setDraggable(v));
    watch(
      () => props.offset,
      (v) => marker.setOffset(v || [0, 0]),
    );
    watch(
      () => props.pitchAlignment,
      (v) => marker.setPitchAlignment(v || "auto"),
    );
    watch(
      () => props.rotationAlignment,
      (v) => marker.setRotationAlignment(v || "auto"),
    );

    onBeforeUnmount(marker.remove.bind(marker));

    return () => [h("div", slots.default ? slots.default({}) : undefined)];
  },
});
