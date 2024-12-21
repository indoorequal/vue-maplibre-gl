import type {
  DeckLayer,
  DeckLayerProps,
  TooltipContent,
} from "@/lib/lib/deck.layer.lib.ts";
import {
  createCommentVNode,
  inject,
  onBeforeUnmount,
  ref,
  warn,
  watch,
} from "vue";
import { isLoadedSymbol, mapSymbol } from "@/lib/types";
import { MapboxOverlay } from "@deck.gl/mapbox";
import type { PickingInfo } from "@deck.gl/core";

export function useDeckLayer(
  props: DeckLayerProps & {
    getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
  },
  layerConstructor: DeckLayer,
) {
  const map = inject(mapSymbol)!;
  const isLoaded = inject(isLoadedSymbol)!;
  const overlay = ref();

  if (!map) {
    warn(`Deck.gl layers require a Deck.gl map instance.`);
    return;
  }

  function addLayer() {
    overlay.value = new MapboxOverlay({
      layers: [layerConstructor],
      getTooltip: props.getTooltip
        ? (f: PickingInfo) => props.getTooltip!(f)
        : undefined,
    });

    map.value!.addControl(overlay.value);
  }

  watch(isLoaded, (il) => {
    if (il) {
      addLayer();
    }
  });

  onBeforeUnmount(() => {
    map.value!.removeControl(overlay.value);
  });

  return () => createCommentVNode(`${props.id} Deck Layer`);
}
