import type { LineLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Line Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglLineLayer",
  props: { ...layerProps<LineLayerSpecification>() },
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<LineLayerSpecification>("line", props);
  },
});
