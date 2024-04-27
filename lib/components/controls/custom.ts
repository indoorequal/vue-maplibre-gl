import type { ControlPosition, IControl } from "maplibre-gl";
import {
  nextTick,
  Ref,
} from "vue";
import {
  Position,
} from "@/lib/components/controls/position.enum";

export class CustomControl implements IControl {
  public static readonly CONTROL_CLASS = "maplibregl-ctrl";
  public static readonly CONTROL_GROUP_CLASS = "maplibregl-ctrl-group";

  public readonly container: HTMLDivElement;

  constructor(
    private isAdded: Ref<boolean>,
    noClasses: boolean,
  ) {
    this.container = document.createElement("div");
    this.setClasses(noClasses);
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

  setClasses(noClasses: boolean) {
    if (noClasses) {
      this.container.classList.remove(CustomControl.CONTROL_CLASS);
      this.container.classList.remove(CustomControl.CONTROL_GROUP_CLASS);
    } else {
      this.container.classList.add(CustomControl.CONTROL_CLASS);
      this.container.classList.add(CustomControl.CONTROL_GROUP_CLASS);
    }
  }
}
