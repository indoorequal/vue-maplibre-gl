import { Ref } from 'vue';
import { Source, SourceSpecification } from 'maplibre-gl';
import { SourceOptionProps } from '../types';
export declare class SourceLib {
    private static readonly REFS;
    static genSourceOpts(opts: SourceOptionProps): SourceSpecification;
    static getSourceRef<T extends Source>(mcid: number, source: string | Source | undefined): Ref<T | undefined | null>;
}
