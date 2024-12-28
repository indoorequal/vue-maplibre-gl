import { defineComponent } from "vue";
import { ScatterplotLayer, type ScatterplotLayerProps } from "@deck.gl/layers";
import { useDeckLayer } from "@/lib/composable/useDeckLayer";
import { type PickingInfo } from "@deck.gl/core";
import {
  genDeckLayerOpts,
  scatteredPlotProps,
  scatteredPlotPropsKeys,
  type TooltipContent,
} from "@/lib/lib/deck.layer.lib";

/**
 * Deck.gl ScatteredPlot Layer
 *
 * See the [Deck.gl ScatteredPlot Layer docs](https://deck.gl/docs/api-reference/layers/scatterplot-layer)
 */
export default defineComponent({
  name: "MglDeckScatteredPlotLayer",
  props: {
    ...scatteredPlotProps(),
  },
  setup(props) {
    const opts = { ...props } as ScatterplotLayerProps & {
      getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
    };
    return useDeckLayer(
      opts,
      new ScatterplotLayer(
        genDeckLayerOpts({ ...opts }, scatteredPlotPropsKeys),
      ),
    );
  },
});
