import { ComponentInternalInstance, Raw } from 'vue';
import { Map, MapEventType } from 'maplibre-gl';
import { MglEvent } from '../types';
export type MapEventHandler<T extends keyof MapEventType> = (e: MapEventType[T]) => void;
export type MapEvent = `map:${keyof MapEventType}`;
export declare const MAP_EVENT_TYPES: Array<keyof MapEventType>;
export declare function createEventHandler<T extends keyof MapEventType>(component: Raw<ComponentInternalInstance>, map: Map, ctx: {
    emit: (event: MapEvent, payload: MglEvent<T>) => void;
}, eventName: MapEvent): MapEventHandler<T>;
