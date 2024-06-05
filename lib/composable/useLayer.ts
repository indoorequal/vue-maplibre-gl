import {
  createCommentVNode,
  getCurrentInstance,
  inject,
  warn,
  watch,
} from "vue";
import {
  componentIdSymbol,
  isLoadedSymbol,
  mapSymbol,
  sourceIdSymbol,
} from "@/lib/types";
import { useDisposableLayer } from "@/lib/composable/useDisposableLayer";
import { LayerLib, type LayersWithSource, type LayerProps } from "@/lib/lib/layer.lib";
import { SourceLib } from "@/lib/lib/source.lib";

export function useLayer<T extends LayersWithSource>(name: string, props: LayerProps) {
  const sourceId = inject(sourceIdSymbol);

  if (!sourceId && !props.source) {
    warn(
      `${name} Layer: layer must be used inside source tag or source prop must be set`,
    );
    return;
  }

  const ci = getCurrentInstance()!,
  map = inject(mapSymbol)!,
  isLoaded = inject(isLoadedSymbol)!,
  cid = inject(componentIdSymbol)!,
  sourceRef = SourceLib.getSourceRef(cid, props.source || sourceId);
  useDisposableLayer(props.layerId!, ci);

  watch(
    () => props.filter,
    (f) => map.value!.setFilter(props.layerId!, f),
  );

  watch(
    [isLoaded, sourceRef],
    ([il, src]) => {
      if (il && (src || src === undefined)) {
        map.value!.addLayer(
          LayerLib.genLayerOpts<T>(
            props.layerId!,
            name,
            props,
            sourceId,
          ),
          props.before || undefined,
        );
        LayerLib.registerLayerEvents(map.value!, props.layerId!, ci.vnode);
      }
    },
    { immediate: true },
  );

  return () => createCommentVNode(`${name} Layer`);
};