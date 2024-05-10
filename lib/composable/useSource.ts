import { inject, onBeforeUnmount, type Ref, watch } from "vue";
import type { Source, SourceSpecification } from "maplibre-gl";
import { isLoadedSymbol, mapSymbol } from "@/lib/types";
import type { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";

export function useSource<O extends object>(
  source: Ref<Source | undefined | null>,
  props: any,
  type: string,
  sourceOpts: Array<keyof O>,
  registry: SourceLayerRegistry,
) {
  const map = inject(mapSymbol)!,
    isLoaded = inject(isLoadedSymbol)!;

  function addSource() {
    if (isLoaded.value) {
      map.value!.addSource(
        props.sourceId,
        SourceLib.genSourceOpts<object, O>(
          type,
          props,
          sourceOpts,
        ) as SourceSpecification,
      );
      source.value = map.value!.getSource(props.sourceId);
    }
  }

  watch(isLoaded, addSource, { immediate: true });
  map.value!.on("style.load", addSource);

  return onBeforeUnmount(() => {
    if (isLoaded.value) {
      registry.unmount();
      map.value!.removeSource(props.sourceId);
    }
    map.value!.off("style.load", addSource);
  });
}
