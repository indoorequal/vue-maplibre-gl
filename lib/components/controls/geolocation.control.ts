import { defineComponent, inject, onBeforeUnmount, type PropType } from "vue";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { type FitBoundsOptions, GeolocateControl } from "maplibre-gl";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

export default /*#__PURE__*/ defineComponent({
  name: "MglGeolocationControl",
  props: {
    position: {
      type: String as PropType<PositionProp>,
      default: Position.TOP_RIGHT,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    positionOptions: {
      type: Object as PropType<PositionOptions>,
      default: { enableHighAccuracy: false, timeout: 6000 } as PositionOptions,
    },
    fitBoundsOptions: {
      type: Object as PropType<FitBoundsOptions>,
      default: { maxZoom: 15 } as FitBoundsOptions,
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
  setup(props) {
    const map = inject(mapSymbol)!,
      isInitialized = inject(isInitializedSymbol)!,
      control = new GeolocateControl({
        positionOptions: props.positionOptions,
        fitBoundsOptions: props.fitBoundsOptions,
        trackUserLocation: props.trackUserLocation,
        showAccuracyCircle: props.showAccuracyCircle,
        showUserLocation: props.showUserLocation,
      });

    usePositionWatcher(() => props.position, map, control);
    onBeforeUnmount(
      () => isInitialized.value && map.value?.removeControl(control),
    );
  },
});
