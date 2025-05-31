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
    "map:error": (event) => true,
    "map:load": (event) => true,
    "map:idle": (event) => true,
    "map:remove": (event) => true,
    "map:render": (event) => true,
    "map:resize": (event) => true,
    "map:webglcontextlost": (event) => true,
    "map:webglcontextrestored": (event) => true,
    "map:dataloading": (event) => true,
    "map:data": (event) => true,
    "map:tiledataloading": (event) => true,
    "map:sourcedataloading": (event) => true,
    "map:styledataloading": (event) => true,
    "map:sourcedata": (event) => true,
    "map:styledata": (event) => true,
    "map:styleimagemissing": (event) => true,
    "map:dataabort": (event) => true,
    "map:sourcedataabort": (event) => true,
    "map:boxzoomcancel": (event) => true,
    "map:boxzoomstart": (event) => true,
    "map:boxzoomend": (event) => true,
    "map:touchcancel": (event) => true,
    "map:touchmove": (event) => true,
    "map:touchend": (event) => true,
    "map:touchstart": (event) => true,
    "map:click": (event) => true,
    "map:contextmenu": (event) => true,
    "map:dblclick": (event) => true,
    "map:mousemove": (event) => true,
    "map:mouseup": (event) => true,
    "map:mousedown": (event) => true,
    "map:mouseout": (event) => true,
    "map:mouseover": (event) => true,
    "map:movestart": (event) => true,
    "map:move": (event) => true,
    "map:moveend": (event) => true,
    "map:zoomstart": (event) => true,
    "map:zoom": (event) => true,
    "map:zoomend": (event) => true,
    "map:rotatestart": (event) => true,
    "map:rotate": (event) => true,
    "map:rotateend": (event) => true,
    "map:dragstart": (event) => true,
    "map:drag": (event) => true,
    "map:dragend": (event) => true,
    "map:pitchstart": (event) => true,
    "map:pitch": (event) => true,
    "map:pitchend": (event) => true,
    "map:wheel": (event) => true,
    "map:terrain": (event) => true,
    "map:cooperativegestureprevented": (event) => true,
    "map:projectiontransition": (event) => true,
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
