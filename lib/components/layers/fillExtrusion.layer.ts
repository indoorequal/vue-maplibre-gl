import type { FillExtrusionLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Fill Extrusion Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglFillExtrusionLayer",
  props: { ...layerProps<FillExtrusionLayerSpecification>() },
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<FillExtrusionLayerSpecification>("fill-extrusion", props);
  },
});
