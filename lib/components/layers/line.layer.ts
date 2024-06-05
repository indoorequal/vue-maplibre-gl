import type { LineLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglLineLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<LineLayerSpecification["layout"]>,
    paint: Object as PropType<LineLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<LineLayerSpecification>("line", props);
  },
});
