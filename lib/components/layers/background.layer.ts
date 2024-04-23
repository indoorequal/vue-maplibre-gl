import type { BackgroundLayerSpecification } from "maplibre-gl";
import {
  createCommentVNode,
  defineComponent,
  inject,
  type PropType,
  warn,
  watch,
} from "vue";
import {
  componentIdSymbol,
  isLoadedSymbol,
  mapSymbol,
  sourceIdSymbol,
} from "@/lib/types";
import { LayerLib } from "@/lib/lib/layer.lib";
import { SourceLib } from "@/lib/lib/source.lib";
import { useDisposableLayer } from "@/lib/composable/useDisposableLayer";

export default /*#__PURE__*/ defineComponent({
  name: "MglBackgroundLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<BackgroundLayerSpecification["layout"]>,
    paint: Object as PropType<BackgroundLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    const sourceId = inject(sourceIdSymbol);

    if (!sourceId && !props.source) {
      warn(
        "Background Layer: layer must be used inside source tag or source prop must be set",
      );
      return;
    }

    const map = inject(mapSymbol)!,
      isLoaded = inject(isLoadedSymbol)!,
      cid = inject(componentIdSymbol)!,
      sourceRef = SourceLib.getSourceRef(cid, props.source || sourceId);

    useDisposableLayer(props.layerId!);

    watch(
      [isLoaded, sourceRef],
      ([il, src]) => {
        if (il && (src || src === undefined)) {
          map.value!.addLayer(
            LayerLib.genLayerOpts<BackgroundLayerSpecification>(
              props.layerId!,
              "background",
              props,
              sourceId,
            ),
            props.before || undefined,
          );
        }
      },
      { immediate: true },
    );

    return () => createCommentVNode("Background Layer");
  },
});
