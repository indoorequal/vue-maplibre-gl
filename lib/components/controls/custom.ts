import type { ControlPosition, IControl } from "maplibre-gl";
import { nextTick, Ref } from "vue";
import { Position } from "@/lib/components/controls/position.enum";

export class CustomControl implements IControl {
  public readonly container: HTMLDivElement;

  constructor(
    private isAdded: Ref<boolean>,
    classes: string,
  ) {
    this.container = document.createElement("div");
    this.setClasses(classes);
  }

  getDefaultPosition(): ControlPosition {
    return Position.TOP_LEFT;
  }

  onAdd(): HTMLElement {
    nextTick(() => (this.isAdded.value = true));
    return this.container;
  }

  onRemove(): void {
    this.isAdded.value = false;
    this.container.remove();
  }

  setClasses(classes: string) {
    this.container.className = classes;
  }
}
