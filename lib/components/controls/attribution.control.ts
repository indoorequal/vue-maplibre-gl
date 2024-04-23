import { defineComponent, inject, onBeforeUnmount, type PropType } from 'vue';
import { AttributionControl } from 'maplibre-gl';
import { Position, type PositionProp, PositionValues } from '@/lib/components/controls/position.enum';
import { isInitializedSymbol, mapSymbol } from '@/lib/types';
import { usePositionWatcher } from '@/lib/composable/usePositionWatcher';

export default /*#__PURE__*/ defineComponent({
  name : 'MglAttributionControl',
  props: {
    position         : {
      type     : String as PropType<PositionProp>,
      validator: (v: Position) => {
	return PositionValues.indexOf(v) !== -1;
      }
    },
    compact          : Boolean as PropType<boolean>,
    customAttribution: [ String, Array ] as PropType<string | string[]>
  },
  setup(props) {
    const map           = inject(mapSymbol)!,
          isInitialized = inject(isInitializedSymbol)!,
          control       = new AttributionControl({ compact: props.compact, customAttribution: props.customAttribution });

    usePositionWatcher(() => props.position, map, control);
    onBeforeUnmount(() => isInitialized.value && map.value!.removeControl(control));

  }
});
