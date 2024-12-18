import { defineComponent } from "vue";
import { ArcLayer, type ArcLayerProps } from "@deck.gl/layers";
import { useDeckLayer } from "@/lib/composable/useDeckLayer";
import { type PickingInfo } from "@deck.gl/core";
import {
  arcProps,
  arcPropsKeys,
  genDeckLayerOpts,
  type TooltipContent,
} from "@/lib/lib/deck.layer.lib";

/**
 * Deck.gl Arc Layer
 *
 * See the [https://deck.gl/docs/api-reference/layers/arc-layer]
 */
export default defineComponent({
  name: "MglDeckArcLayer",
  props: {
    ...arcProps(),
  },
  setup(props) {
    const opts = { ...props } as ArcLayerProps & {
      getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
    };
    return useDeckLayer(
      opts,
      new ArcLayer(genDeckLayerOpts({ ...opts }, arcPropsKeys)),
    );
  },
});
