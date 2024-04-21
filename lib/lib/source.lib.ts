import { ref, type Ref, unref } from 'vue';
import type { Source } from 'maplibre-gl';

export class SourceLib {

  private static readonly REFS = new Map<string, Ref<Source | undefined | null>>();

  static genSourceOpts<T extends object, O extends object>(type: string, props: object, sourceOpts: Array<keyof O>): T {

    return Object.keys(props)
      .filter(opt => (props as any)[ opt ] !== undefined && sourceOpts.indexOf(opt as any) !== -1)
      .reduce((obj, opt) => {
	(obj as any)[ opt ] = unref((props as any)[ opt ]);
	return obj;
      }, { type } as T);

  }

  static getSourceRef<T extends Source>(mcid: number, source: any): Ref<T | undefined | null> {

    const isString = typeof source === 'string',
    key      = String(mcid) + (isString ? source : '');
    let r          = SourceLib.REFS.get(key);
    if (!r) {
      r = ref(isString ? null : undefined);
      SourceLib.REFS.set(key, r);
    }
    return r as Ref<T | undefined | null>;

  }

}
