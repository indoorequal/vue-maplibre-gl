import type { FillLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, type LayerProps, MapLayerEmits } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Fill Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglFillLayer",
  props: layerProps<FillLayerSpecification>(),
  emits: MapLayerEmits,
  setup(props: LayerProps<FillLayerSpecification>) {
    return useLayer<FillLayerSpecification>("fill", props);
  },
});
