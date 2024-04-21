import type { WatchSource } from '@vue/runtime-core';
import { type ShallowRef, watch } from 'vue';
import type { IControl, Map } from 'maplibre-gl';
import { type Position, type PositionProp, PositionValues } from '@/lib/components/controls/position.enum';

export function usePositionWatcher(source: WatchSource<PositionProp | undefined>, map: ShallowRef<Map | undefined>, control: IControl) {
	watch(source, (v) => {
		if (v && PositionValues.indexOf(v as Position) === -1) {
			return;
		}
		if (map.value?.hasControl(control)) {
			map.value.removeControl(control);
		}
		map.value?.addControl(control, v);
	}, { immediate: true });
}
