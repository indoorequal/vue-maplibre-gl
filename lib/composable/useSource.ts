import { inject, onBeforeUnmount, type Ref, watch } from "vue";
import type { Source } from "maplibre-gl";
import { isLoadedSymbol, mapSymbol, SourceOptionProps } from "@/lib/types";
import type { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";

export function useSource(
  source: Ref<Source | undefined | null>,
  props: SourceOptionProps,
  registry: SourceLayerRegistry,
) {
  const map = inject(mapSymbol)!,
    isLoaded = inject(isLoadedSymbol)!;

  function addSource() {
    if (isLoaded.value && map.value?.isStyleLoaded()) {
      map.value!.addSource(props.sourceId, SourceLib.genSourceOpts(props));
      source.value = map.value!.getSource(props.sourceId);
    }
  }

  watch(isLoaded, addSource, { immediate: true });
  map.value!.on("styledata", addSource);

  return onBeforeUnmount(() => {
    if (isLoaded.value) {
      registry.unmount();
      map.value!.removeSource(props.sourceId);
    }
    map.value!.off("styledata", addSource);
  });
}
