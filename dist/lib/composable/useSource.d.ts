import { Ref } from 'vue';
import { Source } from 'maplibre-gl';
import { SourceOptionProps } from '../types';
import { SourceLayerRegistry } from '../lib/sourceLayer.registry';
export declare function useSource(source: Ref<Source | undefined | null>, props: SourceOptionProps, registry: SourceLayerRegistry): void;
