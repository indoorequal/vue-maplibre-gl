import type { FillExtrusionLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglFillExtrusionLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<FillExtrusionLayerSpecification["layout"]>,
    paint: Object as PropType<FillExtrusionLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<FillExtrusionLayerSpecification>("fill-extrusion", props);
  },
});
