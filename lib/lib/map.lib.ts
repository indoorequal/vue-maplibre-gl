import type { ComponentInternalInstance, Raw } from "vue";
import type { Map, MapEventType, LngLat } from "maplibre-gl";
import type { MglEvent } from "@/lib/types";

export type MapEventHandler<T extends keyof MapEventType> = (
  e: MapEventType[T],
) => void;

export type MapEvent<T extends keyof MapEventType = keyof MapEventType> = `map:${T}`;

// export type EventType = `map:${keyof MapEventType}`

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
] as const;

export type MapWrapEventEmitsType<T extends keyof MapEventType = keyof MapEventType> = {
  [K in T as K extends `update:${string}` ? K : `map:${K}`]: (event: MapEventType[K]) => true
};

export const MapWrapEventEmits: MapWrapEventEmitsType = {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    // type signature is inferred by vue from the type
    "map:error": (event: MapEventType["error"]) => true,
    "map:load": (event: MapEventType["load"]) => true,
    "map:idle": (event: MapEventType["idle"]) => true,
    "map:remove": (event: MapEventType["remove"]) => true,
    "map:render": (event: MapEventType["render"]) => true,
    "map:resize": (event: MapEventType["resize"]) => true,
    "map:webglcontextlost": (event: MapEventType["webglcontextlost"]) => true,
    "map:webglcontextrestored": (event: MapEventType["webglcontextrestored"]) => true,
    "map:dataloading": (event: MapEventType["dataloading"]) => true,
    "map:data": (event: MapEventType["data"]) => true,
    "map:tiledataloading": (event: MapEventType["tiledataloading"]) => true,
    "map:sourcedataloading": (event: MapEventType["sourcedataloading"]) => true,
    "map:styledataloading": (event: MapEventType["styledataloading"]) => true,
    "map:sourcedata": (event: MapEventType["sourcedata"]) => true,
    "map:styledata": (event: MapEventType["styledata"]) => true,
    "map:styleimagemissing": (event: MapEventType["styleimagemissing"]) => true,
    "map:dataabort": (event: MapEventType["dataabort"]) => true,
    "map:sourcedataabort": (event: MapEventType["sourcedataabort"]) => true,
    "map:boxzoomcancel": (event: MapEventType["boxzoomcancel"]) => true,
    "map:boxzoomstart": (event: MapEventType["boxzoomstart"]) => true,
    "map:boxzoomend": (event: MapEventType["boxzoomend"]) => true,
    "map:touchcancel": (event: MapEventType["touchcancel"]) => true,
    "map:touchmove": (event: MapEventType["touchmove"]) => true,
    "map:touchend": (event: MapEventType["touchend"]) => true,
    "map:touchstart": (event: MapEventType["touchstart"]) => true,
    "map:click": (event: MapEventType["click"]) => true,
    "map:contextmenu": (event: MapEventType["contextmenu"]) => true,
    "map:dblclick": (event: MapEventType["dblclick"]) => true,
    "map:mousemove": (event: MapEventType["mousemove"]) => true,
    "map:mouseup": (event: MapEventType["mouseup"]) => true,
    "map:mousedown": (event: MapEventType["mousedown"]) => true,
    "map:mouseout": (event: MapEventType["mouseout"]) => true,
    "map:mouseover": (event: MapEventType["mouseover"]) => true,
    "map:movestart": (event: MapEventType["movestart"]) => true,
    "map:move": (event: MapEventType["move"]) => true,
    "map:moveend": (event: MapEventType["moveend"]) => true,
    "map:zoomstart": (event: MapEventType["zoomstart"]) => true,
    "map:zoom": (event: MapEventType["zoom"]) => true,
    "map:zoomend": (event: MapEventType["zoomend"]) => true,
    "map:rotatestart": (event: MapEventType["rotatestart"]) => true,
    "map:rotate": (event: MapEventType["rotate"]) => true,
    "map:rotateend": (event: MapEventType["rotateend"]) => true,
    "map:dragstart": (event: MapEventType["dragstart"]) => true,
    "map:drag": (event: MapEventType["drag"]) => true,
    "map:dragend": (event: MapEventType["dragend"]) => true,
    "map:pitchstart": (event: MapEventType["pitchstart"]) => true,
    "map:pitch": (event: MapEventType["pitch"]) => true,
    "map:pitchend": (event: MapEventType["pitchend"]) => true,
    "map:wheel": (event: MapEventType["wheel"]) => true,
    "map:terrain": (event: MapEventType["terrain"]) => true,
    "map:cooperativegestureprevented": (event: MapEventType["cooperativegestureprevented"]) => true,
    "map:projectiontransition": (event: MapEventType["projectiontransition"]) => true,
  }

export type UpdateMapEventEmitType = {
  "update:center": (value: LngLat) => true,
  "update:zoom": (value: number) => true,
  "update:pitch": (value: number) => true,
  "update:bearing": (value: number) => true,
}

export const UpdateMapEvents: UpdateMapEventEmitType = {
    /**
     * Center property updated
     */
    "update:center": (value: LngLat) => true,
    /**
     * Zoom property updated
     */
    "update:zoom": (value: number) => true,
    /**
     * Pitch property updated
     */
    "update:pitch": (value: number) => true,
    /**
     * Bearing property updated
     */
    "update:bearing": (value: number) => true,
}

export type MapEventEmitTypes = MapWrapEventEmitsType & UpdateMapEventEmitType

export const MapEventEmits: MapEventEmitTypes = {...UpdateMapEvents, ...MapWrapEventEmits}

export function createEventHandler<T extends keyof MapEventType>(
  component: Raw<ComponentInternalInstance>,
  map: Map,
  ctx: {
    emit: (event: MapEvent<T>, payload: MglEvent<T>) => void;
  },
  eventName: MapEvent<T>,
): MapEventHandler<T> {
  return (payload: MapEventType[T]) =>
    ctx.emit(eventName, {
      type: payload.type,
      map,
      component,
      event: payload,
    });
}
