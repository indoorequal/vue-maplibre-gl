import { defineComponent, inject, onBeforeUnmount, type PropType } from "vue";
import type { IControl, Map as MMap } from "maplibre-gl";
import {
  Position,
  type PositionProp,
  PositionValues,
} from "@/lib/components/controls/position.enum";
import { isInitializedSymbol, mapSymbol } from "@/lib/types";
import { usePositionWatcher } from "@/lib/composable/usePositionWatcher";

class FrameRateControl implements IControl {
  private frames = 0;
  private totalTime = 0;
  private totalFrames = 0;

  private time: number | null = null;
  private map?: MMap;
  private container?: HTMLDivElement;
  private readOutput?: HTMLDivElement;
  private canvas?: HTMLCanvasElement;

  private eventHandlers = new Map<string, Function>();

  constructor(
    private background = "rgba(0,0,0,0.9)",
    private barWidth = 4 * window.devicePixelRatio,
    private color = "#7cf859",
    private font = "Monaco, Consolas, Courier, monospace",
    private graphHeight = 60 * window.devicePixelRatio,
    private graphWidth = 90 * window.devicePixelRatio,
    private graphTop = 0,
    private graphRight = 5 * window.devicePixelRatio,
    private width = 100 * window.devicePixelRatio,
  ) {}

  getDefaultPosition(): Position {
    return Position.TOP_RIGHT;
  }

  onAdd(map: MMap): HTMLElement {
    this.map = map;

    const el = (this.container = document.createElement("div"));
    el.className = "maplibregl-ctrl maplibregl-ctrl-fps";

    el.style.backgroundColor = this.background;
    el.style.borderRadius = "6px";

    this.readOutput = document.createElement("div");
    this.readOutput.style.color = this.color;
    this.readOutput.style.fontFamily = this.font;
    this.readOutput.style.padding = "0 5px 5px";
    this.readOutput.style.fontSize = "9px";
    this.readOutput.style.fontWeight = "bold";
    this.readOutput.textContent = "Waiting…";

    this.canvas = document.createElement("canvas");
    this.canvas.className = "maplibregl-ctrl-canvas";
    this.canvas.width = this.width;
    this.canvas.height = this.graphHeight;
    this.canvas.style.cssText = `width: ${this.width / window.devicePixelRatio}px; height: ${this.graphHeight / window.devicePixelRatio}px;`;

    el.appendChild(this.readOutput);
    el.appendChild(this.canvas);

    this.eventHandlers.set("movestart", this.onMoveStart.bind(this));
    this.eventHandlers.set("moveend", this.onMoveEnd.bind(this));
    this.map.on("movestart", this.eventHandlers.get("movestart") as any);
    this.map.on("moveend", this.eventHandlers.get("moveend") as any);
    return this.container;
  }

  onRemove(): void {
    this.map!.off("movestart", this.eventHandlers.get("movestart") as any);
    this.map!.off("moveend", this.eventHandlers.get("moveend") as any);
    this.eventHandlers.clear();
    this.container!.parentNode!.removeChild(this.container!);
    this.map = undefined;
  }

  onMoveStart() {
    this.frames = 0;
    this.time = performance.now();
    this.eventHandlers.set("render", this.onRender.bind(this));
    this.map!.on("render", this.eventHandlers.get("render") as any);
  }

  onMoveEnd() {
    const now = performance.now();
    this.updateGraph(this.getFPS(now));
    this.frames = 0;
    this.time = null;
    this.map!.off("render", this.eventHandlers.get("render") as any);
  }

  onRender() {
    if (this.time) {
      this.frames++;
      const now = performance.now();
      if (now >= this.time + 1e3) {
        this.updateGraph(this.getFPS(now));
        this.frames = 0;
        this.time = performance.now();
      }
    }
  }

  getFPS(now: number) {
    this.totalTime += now - this.time!;
    this.totalFrames += this.frames;
    return Math.round((1e3 * this.frames) / (now - this.time!)) || 0;
  }

  updateGraph(fpsNow: number) {
    const context = this.canvas!.getContext("2d")!;
    const fps = Math.round((1e3 * this.totalFrames) / this.totalTime) || 0;
    const rect = (this.graphHeight, this.barWidth);

    context.fillStyle = this.background;
    context.globalAlpha = 1;
    context.fillRect(0, 0, this.graphWidth, this.graphTop);
    context.fillStyle = this.color;

    this.readOutput!.textContent = `${fpsNow} FPS (${fps} Avg)`;
    context.drawImage(
      this.canvas!,
      this.graphRight + rect,
      this.graphTop,
      this.graphWidth - rect,
      this.graphHeight,
      this.graphRight,
      this.graphTop,
      this.graphWidth - rect,
      this.graphHeight,
    );
    context.fillRect(
      this.graphRight + this.graphWidth - rect,
      this.graphTop,
      rect,
      this.graphHeight,
    );
    context.fillStyle = this.background;
    context.globalAlpha = 0.75;
    context.fillRect(
      this.graphRight + this.graphWidth - rect,
      this.graphTop,
      rect,
      (1 - fpsNow / 100) * this.graphHeight,
    );
  }
}

/**
 * Display a frame rate control
 * @deprecated Will be removed in the version 5
 */
export default defineComponent({
  name: "MglFrameRateControl",
  props: {
    position: {
      type: String as PropType<PositionProp>,
      validator: (v: Position) => {
        return PositionValues.indexOf(v) !== -1;
      },
    },
    background: {
      type: String as PropType<string>,
      default: "rgba(0,0,0,0.9)",
    },
    barWidth: {
      type: Number as PropType<number>,
      default: 4 * window.devicePixelRatio,
    },
    color: {
      type: String as PropType<string>,
      default: "#7cf859",
    },
    font: {
      type: String as PropType<string>,
      default: "Monaco, Consolas, Courier, monospace",
    },
    graphHeight: {
      type: Number as PropType<number>,
      default: 60 * window.devicePixelRatio,
    },
    graphWidth: {
      type: Number as PropType<number>,
      default: 90 * window.devicePixelRatio,
    },
    graphTop: {
      type: Number as PropType<number>,
      default: 0,
    },
    graphRight: {
      type: Number as PropType<number>,
      default: 5 * window.devicePixelRatio,
    },
    width: {
      type: Number as PropType<number>,
      default: 100 * window.devicePixelRatio,
    },
  },
  setup(props) {
    const map = inject(mapSymbol)!,
      isInitialized = inject(isInitializedSymbol)!,
      control = new FrameRateControl(
        props.background,
        props.barWidth,
        props.color,
        props.font,
        props.graphHeight,
        props.graphWidth,
        props.graphTop,
        props.graphRight,
        props.width,
      );

    usePositionWatcher(() => props.position, map, control);
    onBeforeUnmount(
      () => isInitialized.value && map.value?.removeControl(control),
    );
  },
  render() {
    return null;
  },
});
