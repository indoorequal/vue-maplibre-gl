import type { CircleLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Circle Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglCircleLayer",
  props: { ...layerProps<CircleLayerSpecification>() },
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<CircleLayerSpecification>("circle", props);
  },
});
