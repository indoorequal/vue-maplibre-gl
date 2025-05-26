import type { RasterLayerSpecification } from "maplibre-gl";
import { defineComponent } from "vue";
import { layerProps, LAYER_EVENTS, LayerEventType, LayerProps } from "@/lib/lib/layer.lib";
import { useLayer } from "@/lib/composable/useLayer";

/**
 * Raster Layer
 *
 * See the [layer style specification](https://maplibre.org/maplibre-style-spec/layers/)
 */
export default defineComponent({
  name: "MglRasterLayer",
  props: layerProps<RasterLayerSpecification>(),
  emits: [...(LAYER_EVENTS as Array<LayerEventType>)],
  setup(props: LayerProps<RasterLayerSpecification>) {
    return useLayer<RasterLayerSpecification>("raster", props);
  },
});
