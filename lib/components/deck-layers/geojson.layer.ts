import { defineComponent } from "vue";
import { GeoJsonLayer, type GeoJsonLayerProps } from "@deck.gl/layers";
import { useDeckLayer } from "@/lib/composable/useDeckLayer";
import { type PickingInfo } from "@deck.gl/core";
import {
  genDeckLayerOpts,
  geojsonProps,
  geoJsonPropsKeys,
  type TooltipContent,
} from "@/lib/lib/deck.layer.lib";

/**
 * Deck.gl Geojson Layer
 *
 * See the [https://deck.gl/docs/api-reference/layers/geojson-layer]
 */
export default defineComponent({
  name: "MglDeckGeojsonLayer",
  props: {
    ...geojsonProps(),
  },
  setup(props) {
    const opts = { ...props } as GeoJsonLayerProps & {
      getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
    };

    return useDeckLayer(
      opts,
      new GeoJsonLayer(genDeckLayerOpts({ ...opts }, geoJsonPropsKeys)),
    );
  },
});
