import type { CircleLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglCircleLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<CircleLayerSpecification["layout"]>,
    paint: Object as PropType<CircleLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<CircleLayerSpecification>("circle", props);
  },
});
