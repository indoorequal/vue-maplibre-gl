import type { HeatmapLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS, LayerProps } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Heatmap Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglHeatmapLayer",
  props: layerProps<HeatmapLayerSpecification>(),
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props: LayerProps<HeatmapLayerSpecification>) {
    return useLayer<HeatmapLayerSpecification>("heatmap", props);
  },
});
