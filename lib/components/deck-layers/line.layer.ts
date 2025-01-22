import { defineComponent } from "vue";
import { LineLayer, type LineLayerProps } from "@deck.gl/layers";
import { useDeckLayer } from "@/lib/composable/useDeckLayer";
import { type PickingInfo } from "@deck.gl/core";
import {
  genDeckLayerOpts,
  lineProps,
  linePropsKeys,
  type TooltipContent,
} from "@/lib/lib/deck.layer.lib";

/**
 * Deck.gl Line Layer
 *
 * See the [Deck.gl Line Layer docs](https://deck.gl/docs/api-reference/layers/line-layer)
 */
export default defineComponent({
  name: "MglDeckLineLayer",
  props: {
    ...lineProps(),
  },
  setup(props) {
    const opts = { ...props } as LineLayerProps & {
      getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
    };
    return useDeckLayer(
      opts,
      new LineLayer(genDeckLayerOpts({ ...opts }, linePropsKeys)),
    );
  },
});
