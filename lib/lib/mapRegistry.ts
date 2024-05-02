import type { MglMap } from "@/lib/components";
import type { Map as MaplibreMap } from "maplibre-gl";
import { reactive, type ShallowRef } from "vue";
import type { ValidLanguages } from "@/lib/types";

export interface MapInstance {
  component?: InstanceType<typeof MglMap>;
  map?: MaplibreMap;
  isMounted: boolean;
  isLoaded: boolean;
  language: ValidLanguages | null;
}

const instances = new Map<symbol | string, MapInstance>(),
  defaultKey = Symbol("default");

// useMap returns reactive version of MapInstance
export function useMap(key: symbol | string = defaultKey): MapInstance {
  let component = instances.get(key);
  if (!component) {
    component = reactive({ isLoaded: false, isMounted: false, language: null });
    instances.set(key, component);
  }
  return component;
}

export function registerMap(
  instance: InstanceType<typeof MglMap>,
  map: ShallowRef<MaplibreMap | undefined>,
  key: symbol | string = defaultKey,
): MapInstance {
  let component = instances.get(key);
  if (!component) {
    component = reactive({ isLoaded: false, isMounted: false, language: null });
    instances.set(key, component);
  }

  component.isLoaded = map.value?.loaded() || false;
  component.isMounted = false;
  component.component = instance;
  component.map = map.value;

  return component;
}
