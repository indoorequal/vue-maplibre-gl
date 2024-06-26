import { inject, onBeforeUnmount, type ComponentInternalInstance } from "vue";
import { unregisterLayerEvents } from "@/lib/lib/layer.lib";
import { isLoadedSymbol, mapSymbol, sourceLayerRegistry } from "@/lib/types";

export function useDisposableLayer(
  layerId: string,
  ci?: ComponentInternalInstance,
) {
  const map = inject(mapSymbol)!,
    isLoaded = inject(isLoadedSymbol)!,
    registry = inject(sourceLayerRegistry)!;

  function removeLayer() {
    if (isLoaded.value) {
      if (ci) {
        unregisterLayerEvents(map.value!, layerId, ci.vnode);
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
