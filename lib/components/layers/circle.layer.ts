import type { CircleLayerSpecification } from "maplibre-gl";
import {
  createCommentVNode,
  defineComponent,
  getCurrentInstance,
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
import { useDisposableLayer } from "@/lib/composable/useDisposableLayer";
import { LayerLib } from "@/lib/lib/layer.lib";
import { SourceLib } from "@/lib/lib/source.lib";

export default defineComponent({
  name: "MglCircleLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<CircleLayerSpecification["layout"]>,
    paint: Object as PropType<CircleLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    const sourceId = inject(sourceIdSymbol);

    if (!sourceId && !props.source) {
      warn(
        "Circle Layer: layer must be used inside source tag or source prop must be set",
      );
      return;
    }

    const ci = getCurrentInstance()!,
      map = inject(mapSymbol)!,
      isLoaded = inject(isLoadedSymbol)!,
      cid = inject(componentIdSymbol)!,
      sourceRef = SourceLib.getSourceRef(cid, props.source || sourceId);

    useDisposableLayer(props.layerId!, ci);

    watch(
      [isLoaded, sourceRef],
      ([il, src]) => {
        if (il && (src || src === undefined)) {
          map.value!.addLayer(
            LayerLib.genLayerOpts<CircleLayerSpecification>(
              props.layerId!,
              "circle",
              props,
              sourceId,
            ),
            props.before || undefined,
          );
          LayerLib.registerLayerEvents(map.value!, props.layerId!, ci.vnode);
        }
      },
      { immediate: true },
    );

    return () => createCommentVNode("Circle Layer");
  },
});
