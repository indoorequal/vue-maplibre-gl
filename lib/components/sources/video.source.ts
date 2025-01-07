import {
  createCommentVNode,
  defineComponent,
  inject,
  isRef,
  type PropType,
  provide,
  type SlotsType,
  watch,
} from "vue";
import {
  componentIdSymbol,
  sourceIdSymbol,
  sourceLayerRegistry,
  SourceOptionProps,
} from "@/lib/types";
import type { Coordinates, VideoSource } from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

/**
 * See [VideoSource](https://maplibre.org/maplibre-gl-js/docs/API/classes/VideoSource/)
 */
export default defineComponent({
  name: "MglVideoSource",
  props: {
    sourceId: {
      type: String as PropType<string>,
      required: true,
    },
    urls: Array as PropType<string[]>,
    coordinates: Array as unknown as PropType<Coordinates>,
  },
  slots: Object as SlotsType<{ default: unknown }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<VideoSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry(),
      opts = { ...props, type: "video" };

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource(source, opts as SourceOptionProps, registry);

    watch(
      [
        isRef(props.coordinates) ? props.coordinates : () => props.coordinates,
        source,
      ],
      ([v, src]) => {
        src?.setCoordinates(v as Coordinates);
      },
      { immediate: true },
    );

    return () => [
      createCommentVNode("Video Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
