import type { FillLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglFillLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<FillLayerSpecification["layout"]>,
    paint: Object as PropType<FillLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<FillLayerSpecification>("fill", props);
  },
});
