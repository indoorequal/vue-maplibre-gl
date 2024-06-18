import { defineComponent, onBeforeUnmount, type PropType } from "vue";
import {
  type FitBoundsOptions,
  type ControlPosition,
  GeolocateControl,
} from "maplibre-gl";
import {
  Position,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { useControl } from "@/lib/composable/useControl";

type GeolocateControlEvent =
  | "trackuserlocationstart"
  | "trackuserlocationend"
  | "userlocationlostfocus"
  | "userlocationfocus"
  | "geolocate"
  | "error"
  | "outofmaxbounds";

/**
 * Render GeolocateControl
 *
 * See [GeolocateControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/)
 */
export default defineComponent({
  name: "MglGeolocateControl",
  props: {
    /**
     * Position on the map to which the control will be added. Valid values are 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Defaults to 'top-right'.
     */
    position: {
      type: String as PropType<ControlPosition>,
      default: Position.TOP_RIGHT,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    /**
     * A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object.
     */
    positionOptions: {
      type: Object as PropType<PositionOptions>,
      default: () =>
        ({ enableHighAccuracy: false, timeout: 6000 }) as PositionOptions,
    },
    /**
     * A options object to use when the map is panned and zoomed to the user's location. The default is to use a maxZoom of 15 to limit how far the map will zoom in for very accurate locations.
     */
    fitBoundsOptions: {
      type: Object as PropType<FitBoundsOptions>,
      default: () => ({ maxZoom: 15 }) as FitBoundsOptions,
    },
    /**
     * If true the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes.
     */
    trackUserLocation: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * By default, if showUserLocation is true, a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to false to disable. Always disabled when showUserLocation is false.
     */
    showAccuracyCircle: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    /**
     * By default a dot will be shown on the map at the user's location. Set to false to disable.
     */
    showUserLocation: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: [
    "trackuserlocationstart",
    "trackuserlocationend",
    "userlocationlostfocus",
    "userlocationfocus",
    "geolocate",
    "error",
    "outofmaxbounds",
  ],
  setup(props, ctx) {
    const { control } = useControl(() => {
      return new GeolocateControl({
        positionOptions: props.positionOptions,
        fitBoundsOptions: props.fitBoundsOptions,
        trackUserLocation: props.trackUserLocation,
        showAccuracyCircle: props.showAccuracyCircle,
        showUserLocation: props.showUserLocation,
      });
    }, props);
    function emitEvent<A>(event: GeolocateControlEvent): void {
      const fun = (arg: A) => {
        ctx.emit(event, arg);
      };
      control.value.on(event, fun);
      onBeforeUnmount(() => {
        control.value.off(event, fun);
      });
    }
    emitEvent<undefined>("trackuserlocationstart");
    emitEvent<undefined>("trackuserlocationend");
    emitEvent<undefined>("userlocationlostfocus");
    emitEvent<undefined>("userlocationfocus");
    emitEvent<GeolocationPosition>("geolocate");
    emitEvent<GeolocationPositionError>("error");
    emitEvent<GeolocationPosition>("outofmaxbounds");
  },
  render() {
    return null;
  },
});
