import type { FillExtrusionLayerSpecification } from "maplibre-gl";
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
import { LayerLib } from "@/lib/lib/layer.lib";
import { SourceLib } from "@/lib/lib/source.lib";
import { useDisposableLayer } from "@/lib/composable/useDisposableLayer";

export default defineComponent({
  name: "MglFillExtrusionLayer",
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<FillExtrusionLayerSpecification["layout"]>,
    paint: Object as PropType<FillExtrusionLayerSpecification["paint"]>,
  },
  emits: [...LayerLib.SHARED.emits],
  setup(props) {
    const sourceId = inject(sourceIdSymbol);

    if (!sourceId && !props.source) {
      warn(
        "Fill Extrude Layer: layer must be used inside source tag or source prop must be set",
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
      () => props.filter,
      (f) => map.value!.setFilter(props.layerId!, f),
    );

    watch(
      [isLoaded, sourceRef],
      ([il, src]) => {
        if (il && (src || src === undefined)) {
          map.value!.addLayer(
            LayerLib.genLayerOpts<FillExtrusionLayerSpecification>(
              props.layerId!,
              "fill-extrusion",
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

    return () => createCommentVNode("Fill Extrusion Layer");
  },
});
