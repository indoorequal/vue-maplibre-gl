import type { BackgroundLayerSpecification } from "maplibre-gl";
import {
  createCommentVNode,
  defineComponent,
  inject,
  type PropType,
  watch,
} from "vue";
import { isLoadedSymbol, mapSymbol } from "@/lib/types";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useDisposableLayer } from "@/lib/composable/useDisposableLayer";

export default defineComponent({
  name: "MglBackgroundLayer",
  props: {
    layerId: {
      type: String as PropType<string>,
      required: true,
    },
    metadata: [Object, Array, String, Number] as PropType<unknown>,
    minzoom: Number as PropType<number>,
    maxzoom: Number as PropType<number>,
    before: String as PropType<string>,
    layout: Object as PropType<BackgroundLayerSpecification["layout"]>,
    paint: Object as PropType<BackgroundLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    const map = inject(mapSymbol)!;
    const isLoaded = inject(isLoadedSymbol)!;

    useDisposableLayer(props.layerId!);

    watch(
      isLoaded,
      (il) => {
        if (il) {
          map.value!.addLayer(
            {
              id: props.layerId!,
              type: "background",
              metadata: props.metadata,
              minzoom: props.minzoom,
              maxzoom: props.maxzoom,
              layout: props.layout,
              paint: props.paint,
            },
            props.before || undefined,
          );
        }
      },
      { immediate: true },
    );

    return () => createCommentVNode("Background Layer");
  },
});
