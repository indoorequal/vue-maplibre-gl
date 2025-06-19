import type { LineLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, type LayerProps, MapLayerEmits } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Line Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglLineLayer",
  props: layerProps<LineLayerSpecification>(),
  emits: MapLayerEmits,
  setup(props: LayerProps<LineLayerSpecification>) {
    return useLayer<LineLayerSpecification>("line", props);
  },
});
