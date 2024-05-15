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
    positionOptions: {
      type: Object as PropType<PositionOptions>,
      default: () =>
        ({ enableHighAccuracy: false, timeout: 6000 }) as PositionOptions,
    },
    fitBoundsOptions: {
      type: Object as PropType<FitBoundsOptions>,
      default: () => ({ maxZoom: 15 }) as FitBoundsOptions,
    },
    trackUserLocation: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showAccuracyCircle: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    showUserLocation: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  emits: [
    "trackuserlocationstart",
    "trackuserlocationend",
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
    emitEvent<GeolocationPosition>("geolocate");
    emitEvent<GeolocationPositionError>("error");
    emitEvent<GeolocationPosition>("outofmaxbounds");
  },
  render() {
    return null;
  },
});
