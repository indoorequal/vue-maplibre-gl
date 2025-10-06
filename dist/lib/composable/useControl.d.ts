import { ShallowRef } from 'vue';
import { Map, IControl, ControlPosition } from 'maplibre-gl';
type ControlProps = {
    position?: ControlPosition;
};
/**
 * Add a control to the map, with position watcher
 */
export declare function useControl<T extends IControl>(fun: () => T, props: ControlProps): {
    control: ShallowRef<T>;
    map: ShallowRef<Map | undefined>;
};
export {};
