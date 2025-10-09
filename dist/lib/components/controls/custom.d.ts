import { ControlPosition, IControl } from 'maplibre-gl';
import { Ref } from 'vue';
export declare class CustomControl implements IControl {
    private isAdded;
    readonly container: HTMLDivElement;
    constructor(isAdded: Ref<boolean>, classes: string);
    getDefaultPosition(): ControlPosition;
    onAdd(): HTMLElement;
    onRemove(): void;
    setClasses(classes: string): void;
}
