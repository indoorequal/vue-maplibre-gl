import type { InjectionKey, Ref, ShallowRef } from 'vue';
import type { Map, Marker, SourceSpecification, StyleSpecification } from 'maplibre-gl';
import type { MglMap } from '@/lib/components';
import type { Emitter } from 'mitt';
import type { SourceLayerRegistry } from '@/lib/lib/sourceLayer.registry';

export const mapSymbol           = Symbol('map') as InjectionKey<ShallowRef<Map | undefined>>,
             isLoadedSymbol      = Symbol('isLoaded') as InjectionKey<Ref<boolean>>,
             isInitializedSymbol = Symbol('isInitialized') as InjectionKey<Ref<boolean>>,
             componentIdSymbol   = Symbol('componentId') as InjectionKey<number>,
             sourceIdSymbol      = Symbol('sourceId') as InjectionKey<string>,
             sourceLayerRegistry = Symbol('sourceLayerRegistry') as InjectionKey<SourceLayerRegistry>,
             emitterSymbol       = Symbol('emitter') as InjectionKey<Emitter<MglEvents>>,
             markerSymbol        = Symbol('marker') as InjectionKey<ShallowRef<Marker | undefined>>;

export interface MglEvent<T = any> {
  type: string;
  component: InstanceType<typeof MglMap>;
  map: Map;
  event: T;
}

export type MglEvents = {
  styleSwitched: StyleSwitchItem;
}

export interface StyleSwitchItem {
  name: string;
  label: string;
  icon?: {
    path: string;
  };
  style: StyleSpecification | string;
}

export type AllProps<T extends object> = { [K in keyof T]: undefined };

// only proper way to ensure all possible option to track option changes by type system
export function AllOptions<T extends object>(obj: AllProps<Required<T>>) {
  return Object.keys(obj) as Array<keyof T>;
}

export function AllSourceOptions<T = SourceSpecification>(obj: AllProps<Required<Omit<T, 'type'>>>) {
  return Object.keys(obj) as Array<keyof T>;
}

export type ValidLanguages =
  'sq'
  | 'am'
  | 'ar'
  | 'hy'
  | 'az'
  | 'eu'
  | 'be'
  | 'bs'
  | 'br'
  | 'bg'
  | 'ca'
  | 'zh'
  | 'co'
  | 'hr'
  | 'cs'
  | 'da'
  | 'nl'
  | 'en'
  | 'eo'
  | 'et'
  | 'fi'
  | 'fr'
  | 'fy'
  | 'ka'
  | 'de'
  | 'el'
  | 'he'
  | 'hi'
  | 'hu'
  | 'is'
  | 'id'
  | 'ga'
  | 'it'
  | 'ja'
  | 'ja-Hira'
  | 'ja_kana'
  | 'ja_rm'
  | 'ja-Latn'
  | 'kn'
  | 'kk'
  | 'ko'
  | 'ko-Latn'
  | 'ku'
  | 'la'
  | 'lv'
  | 'lt'
  | 'lb'
  | 'mk'
  | 'ml'
  | 'mt'
  | 'no'
  | 'oc'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'rm'
  | 'ru'
  | 'gd'
  | 'sr'
  | 'sr-Latn'
  | 'sk'
  | 'sl'
  | 'es'
  | 'sv'
  | 'ta'
  | 'te'
  | 'th'
  | 'tr'
  | 'uk'
  | 'cy'
