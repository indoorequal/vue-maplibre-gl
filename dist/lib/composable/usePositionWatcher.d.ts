import { ShallowRef, WatchSource } from 'vue';
import { IControl, Map, ControlPosition } from 'maplibre-gl';
export declare function usePositionWatcher(source: WatchSource<ControlPosition | undefined>, map: ShallowRef<Map | undefined>, control: IControl): void;
