export type SourceLayerRegistryHandler = () => void

export class SourceLayerRegistry {

  private unmountHandlers = new Map<string, SourceLayerRegistryHandler>();

  registerUnmountHandler(id: string, handler: SourceLayerRegistryHandler) {
    this.unmountHandlers.set(id, handler);
  }

  unregisterUnmountHandler(id: string) {
    this.unmountHandlers.delete(id);
  }

  unmount() {
    this.unmountHandlers.forEach((h) => h());
  }

}
