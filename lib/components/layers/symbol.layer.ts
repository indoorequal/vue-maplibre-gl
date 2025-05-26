import type { SymbolLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS, LayerProps, LayerEventType } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Symbol Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglSymbolLayer",
  props: layerProps<SymbolLayerSpecification>(),
  emits: [...(LAYER_EVENTS as Array<LayerEventType>)],
  setup(props: LayerProps<SymbolLayerSpecification>) {
    return useLayer<SymbolLayerSpecification>("symbol", props);
  },
});
