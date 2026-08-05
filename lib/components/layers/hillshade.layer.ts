import type { HillshadeLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, type LayerProps, MapLayerEmits } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Hill shade Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglHillshadeLayer",
  props: layerProps<HillshadeLayerSpecification>(),
  emits: MapLayerEmits,
  setup(props: LayerProps<HillshadeLayerSpecification>) {
    return useLayer<HillshadeLayerSpecification>("hillshade", props);
  },
});
