export type SourceLayerRegistryHandler = () => void;
export declare class SourceLayerRegistry {
    private unmountHandlers;
    registerUnmountHandler(id: string, handler: SourceLayerRegistryHandler): void;
    unregisterUnmountHandler(id: string): void;
    unmount(): void;
}
