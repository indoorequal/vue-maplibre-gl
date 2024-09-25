import type { ComponentInternalInstance, Raw } from "vue";
import type { Map, MapEventType } from "maplibre-gl";
import type { MglEvent } from "@/lib/types";

export type MapEventHandler<T extends keyof MapEventType> = (
  e: MapEventType[T],
) => void;

export type MapEvent = `map:${keyof MapEventType}`;

export const MAP_EVENT_TYPES: Array<keyof MapEventType> = [
  "error",
  "load",
  "idle",
  "remove",
  "render",
  "resize",
  "webglcontextlost",
  "webglcontextrestored",
  "dataloading",
  "data",
  "tiledataloading",
  "sourcedataloading",
  "styledataloading",
  "sourcedata",
  "styledata",
  "styleimagemissing",
  "dataabort",
  "sourcedataabort",
  "boxzoomcancel",
  "boxzoomstart",
  "boxzoomend",
  "touchcancel",
  "touchmove",
  "touchend",
  "touchstart",
  "click",
  "contextmenu",
  "dblclick",
  "mousemove",
  "mouseup",
  "mousedown",
  "mouseout",
  "mouseover",
  "movestart",
  "move",
  "moveend",
  "zoomstart",
  "zoom",
  "zoomend",
  "rotatestart",
  "rotate",
  "rotateend",
  "dragstart",
  "drag",
  "dragend",
  "pitchstart",
  "pitch",
  "pitchend",
  "wheel",
  "terrain",
  "cooperativegestureprevented",
];

export function createEventHandler<T extends keyof MapEventType>(
  component: Raw<ComponentInternalInstance>,
  map: Map,
  ctx: {
    emit: (event: MapEvent, payload: MglEvent<T>) => void;
  },
  eventName: MapEvent,
): MapEventHandler<T> {
  return (payload: MapEventType[T]) =>
    ctx.emit(eventName, {
      type: payload.type,
      map,
      component,
      event: payload,
    });
}
