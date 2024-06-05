import type { RasterLayerSpecification } from "maplibre-gl";
import {
  defineComponent,
  type PropType,
} from "vue";
import { LayerLib } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglRasterLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<RasterLayerSpecification["layout"]>,
    paint: Object as PropType<RasterLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    return useLayer<RasterLayerSpecification>("raster", props);
  },
});
