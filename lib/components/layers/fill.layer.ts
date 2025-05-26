import type { FillLayerSpecification } from "maplibre-gl";
import { defineComponent, ComponentPropsOptions } from "vue";
import { layerProps, LAYER_EVENTS, LayerEventType, LayerProps } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Fill Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglFillLayer",
  props: layerProps<FillLayerSpecification>(),
  emits: [...LAYER_EVENTS] as LayerEventType[],
  setup(props: LayerProps<FillLayerSpecification>) {
    return useLayer<FillLayerSpecification>("fill", props);
  },
});
