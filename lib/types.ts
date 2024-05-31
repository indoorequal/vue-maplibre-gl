import type {
  InjectionKey,
  Ref,
  ShallowRef,
  ComponentInternalInstance,
  Raw,
} from "vue";
import type {
  Map,
  Marker,
  MapEventType,
  SourceSpecification,
} from "maplibre-gl";
import type { SourceLayerRegistry } from "@/lib/lib/sourceLayer.registry";

export const map = Symbol("map"),
  mapSymbol = map as InjectionKey<ShallowRef<Map | undefined>>,
  isLoadedSymbol = Symbol("isLoaded") as InjectionKey<Ref<boolean>>,
  isInitialized = Symbol("isInitialized"),
  isInitializedSymbol = isInitialized as InjectionKey<Ref<boolean>>,
  componentIdSymbol = Symbol("componentId") as InjectionKey<number>,
  sourceIdSymbol = Symbol("sourceId") as InjectionKey<string>,
  sourceLayerRegistry = Symbol(
    "sourceLayerRegistry",
  ) as InjectionKey<SourceLayerRegistry>,
  markerSymbol = Symbol("marker") as InjectionKey<
    ShallowRef<Marker | undefined>
  >;

export interface MglEvent<T extends keyof MapEventType> {
  type: string;
  component: Raw<ComponentInternalInstance>;
  map: Map;
  event: MapEventType[T];
}

export type SourceOptionProps = SourceSpecification & { sourceId: string };
