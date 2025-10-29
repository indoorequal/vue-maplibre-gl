import type { BackgroundLayerSpecification } from "maplibre-gl";
import {
  createCommentVNode,
  defineComponent,
  inject,
  type PropType,
  watch,
} from "vue";
import { isLoadedSymbol, mapSymbol } from "@/lib/types";
import { MapLayerEmits } from "@/lib/lib/layer.lib";
import { useDisposableLayer } from "@/lib/composable/useDisposableLayer";

/**
 * Background Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglBackgroundLayer",
  props: {
    /**
     * The id of the layer
     */
    layerId: {
      type: String as PropType<string>,
      required: true,
    },
    /**
     * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
     */
    metadata: [Object, Array, String, Number] as PropType<unknown>,
    /**
     * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
     */
    minzoom: Number as PropType<number>,
    /**
     * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
     */
    maxzoom: Number as PropType<number>,
    /**
     * The ID of an existing layer to insert the new layer before, resulting in the new layer appearing visually beneath the existing layer. If this argument is not specified, the layer will be appended to the end of the layers array and appear visually above all other layers.
     */
    before: String as PropType<string>,
    /**
     * Layout properties for the layer.
     * See https://maplibre.org/maplibre-style-spec/layers/#background
     */
    layout: Object as PropType<BackgroundLayerSpecification["layout"]>,
    /**
     * Default paint properties for this layer.
     * See https://maplibre.org/maplibre-style-spec/layers/#background
     */
    paint: Object as PropType<BackgroundLayerSpecification["paint"]>,
  },
  emits: MapLayerEmits,
  setup(props) {
    const map = inject(mapSymbol)!;
    const isLoaded = inject(isLoadedSymbol)!;

    useDisposableLayer(props.layerId!);

    watch(
      () => props.layout,
      (layout) => {
        if (layout) {
          for (const [property, value] of Object.entries(layout)) {
            map.value!.setLayoutProperty(props.layerId!, property, value);
          }
        }
      },
    );
    watch(
      () => props.paint,
      (paint) => {
        if (paint) {
          for (const [property, value] of Object.entries(paint)) {
            map.value!.setPaintProperty(props.layerId!, property, value);
          }
        }
      },
    );

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
