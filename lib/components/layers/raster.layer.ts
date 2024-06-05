import type { RasterLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

export default defineComponent({
  name: "MglRasterLayer",
  props: { ...layerProps<RasterLayerSpecification>() },
  emits: [...(LAYER_EVENTS as Array<string>)],
  setup(props) {
    return useLayer<RasterLayerSpecification>("raster", props);
  },
});
