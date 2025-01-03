import { defineComponent } from "vue";
import { PolygonLayer, type PolygonLayerProps } from "@deck.gl/layers";
import { useDeckLayer } from "@/lib/composable/useDeckLayer";
import { type PickingInfo } from "@deck.gl/core";
import {
  genDeckLayerOpts,
  polygonProps,
  polygonPropsKeys,
  type TooltipContent,
} from "@/lib/lib/deck.layer.lib";

/**
 * Deck.gl Polygon Layer
 *
 * See the [Deck.gl Polygon Layer docs](https://deck.gl/docs/api-reference/layers/polygon-layer)
 */
export default defineComponent({
  name: "MglDeckPolygonLayer",
  props: {
    ...polygonProps(),
  },
  setup(props) {
    const opts = { ...props } as PolygonLayerProps & {
      getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
    };
    return useDeckLayer(
      opts,
      new PolygonLayer(genDeckLayerOpts({ ...opts }, polygonPropsKeys)),
    );
  },
});
