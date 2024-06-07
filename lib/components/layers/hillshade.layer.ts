import type { HillshadeLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Hill shade Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglHillshadeLayer",
  props: { ...layerProps<HillshadeLayerSpecification>() },
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<HillshadeLayerSpecification>("hillshade", props);
  },
});
