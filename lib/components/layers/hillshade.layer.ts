import type { HillshadeLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglHillshadeLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<HillshadeLayerSpecification["layout"]>,
    paint: Object as PropType<HillshadeLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<HillshadeLayerSpecification>("hillshade", props);
  },
});
