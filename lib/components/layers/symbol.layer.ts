import type { SymbolLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglSymbolLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<SymbolLayerSpecification["layout"]>,
    paint: Object as PropType<SymbolLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<SymbolLayerSpecification>("symbol", props);
  },
});
