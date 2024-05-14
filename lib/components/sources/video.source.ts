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
  AllSourceOptions,
  componentIdSymbol,
  sourceIdSymbol,
  sourceLayerRegistry,
} from "@/lib/types";
import type {
  Coordinates,
  VideoSource,
  VideoSourceSpecification,
} from "maplibre-gl";
import { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";
import { SourceLib } from "@/lib/lib/source.lib";
import { useSource } from "@/lib/composable/useSource";

const sourceOpts = AllSourceOptions<VideoSourceSpecification>({
  urls: undefined,
  coordinates: undefined,
});

export default /*#__PURE__*/ defineComponent({
  name: "MglVideoSource",
  props: {
    sourceId: {
      type: String as PropType<string>,
      required: true,
    },
    urls: Array as PropType<string[]>,
    coordinates: Array as unknown as PropType<Coordinates>,
  },
  slots: Object as SlotsType<{ default: any }>,
  setup(props, { slots }) {
    const cid = inject(componentIdSymbol)!,
      source = SourceLib.getSourceRef<VideoSource>(cid, props.sourceId),
      registry = new SourceLayerRegistry();

    provide(sourceIdSymbol, props.sourceId);
    provide(sourceLayerRegistry, registry);

    useSource<VideoSourceSpecification>(
      source,
      props,
      "video",
      sourceOpts,
      registry,
    );

    watch(
      isRef(props.coordinates) ? props.coordinates : () => props.coordinates,
      (v) => {
        source.value?.setCoordinates(v as Coordinates);
      },
      { immediate: true },
    );

    return () => [
      createCommentVNode("Video Source"),
      source.value && slots.default ? slots.default({}) : undefined,
    ];
  },
});
