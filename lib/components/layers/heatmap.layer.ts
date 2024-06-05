import type { HeatmapLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglHeatmapLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<HeatmapLayerSpecification["layout"]>,
    paint: Object as PropType<HeatmapLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<HeatmapLayerSpecification>("heatmap", props);
  },
});
