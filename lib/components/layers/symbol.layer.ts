import type { SymbolLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglSymbolLayer",
  props: { ...layerProps<SymbolLayerSpecification>() },
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<SymbolLayerSpecification>("symbol", props);
  },
});
