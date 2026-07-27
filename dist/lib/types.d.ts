import { InjectionKey, Ref, ShallowRef, ComponentInternalInstance, Raw } from 'vue';
import { Map, Marker, MapEventType, SourceSpecification } from 'maplibre-gl';
import { SourceLayerRegistry } from './lib/sourceLayer.registry';
export declare const map: unique symbol, mapSymbol: InjectionKey<ShallowRef<Map | undefined>>, isLoadedSymbol: InjectionKey<Ref<boolean>>, isInitialized: unique symbol, isInitializedSymbol: InjectionKey<Ref<boolean>>, componentIdSymbol: InjectionKey<number>, sourceIdSymbol: InjectionKey<string>, sourceLayerRegistry: InjectionKey<SourceLayerRegistry>, markerSymbol: InjectionKey<ShallowRef<Marker | undefined>>;
export interface MglEvent<T extends keyof MapEventType> {
    type: string;
    component: Raw<ComponentInternalInstance>;
    map: Map;
    event: MapEventType[T];
}
export type SourceOptionProps = SourceSpecification & {
    sourceId: string;
};
