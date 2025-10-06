import { Map as MaplibreMap } from 'maplibre-gl';
import { ShallowRef, Raw, ComponentInternalInstance } from 'vue';
export interface MapInstance {
    component?: Raw<ComponentInternalInstance>;
    map?: MaplibreMap;
    isMounted: boolean;
    isLoaded: boolean;
}
export declare function useMap(key?: symbol | string): MapInstance;
export declare function registerMap(instance: Raw<ComponentInternalInstance>, map: ShallowRef<MaplibreMap | undefined>, key?: symbol | string): MapInstance;
