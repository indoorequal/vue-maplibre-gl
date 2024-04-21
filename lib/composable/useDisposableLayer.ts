import { inject, onBeforeUnmount } from 'vue';
import type { ComponentInternalInstance } from '@vue/runtime-core';
import { LayerLib } from '@/lib/lib/layer.lib';
import { isLoadedSymbol, mapSymbol, sourceLayerRegistry } from '@/lib/types';

export function useDisposableLayer(layerId: string, ci?: ComponentInternalInstance) {

	const map      = inject(mapSymbol)!,
		  isLoaded = inject(isLoadedSymbol)!,
		  registry = inject(sourceLayerRegistry)!;

	function removeLayer() {
		if (isLoaded.value) {
			if (ci) {
				LayerLib.unregisterLayerEvents(map.value!, layerId, ci.vnode);
			}
			const layer = map.value!.getLayer(layerId);
			if (layer) {
				map.value!.removeLayer(layerId);
			}
		}
	}

	registry.registerUnmountHandler(layerId, removeLayer);
	onBeforeUnmount(() => {
		registry.unregisterUnmountHandler(layerId);
		removeLayer();
	});

}
