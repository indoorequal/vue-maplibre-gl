import type { ComponentInternalInstance, Raw } from "vue";
import type { Map, MapEventType } from "maplibre-gl";
import type { MglEvent } from "@/lib/types";

export type MapEventHandler = (e: any) => void;

export class MapLib {
  static readonly MAP_EVENT_TYPES: Array<keyof MapEventType> = [
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
  ];

  static createEventHandler(
    component: Raw<ComponentInternalInstance>,
    map: Map,
    ctx: {
      emit: (t: string, payload: any) => void;
    },
    eventName: string,
  ): MapEventHandler {
    return (payload = {}) =>
      ctx.emit(eventName, {
        type: payload.type,
        map,
        component,
        event: payload,
      } as MglEvent);
  }
}
