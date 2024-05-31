import { ref, type Ref } from "vue";
import type { Source, SourceSpecification } from "maplibre-gl";
import { SourceOptionProps } from "@/lib/types";

export class SourceLib {
  private static readonly REFS = new Map<
    string,
    Ref<Source | undefined | null>
  >();

  static genSourceOpts(opts: SourceOptionProps): SourceSpecification {
    const newOpts = { ...opts };
    for (const opt of Object.keys(newOpts) as Array<keyof SourceOptionProps>) {
      if (newOpts[opt] === undefined || opt === "sourceId") {
        delete newOpts[opt];
      }
    }
    return newOpts;
  }

  static getSourceRef<T extends Source>(
    mcid: number,
    source: string | Source | undefined,
  ): Ref<T | undefined | null> {
    const isString = typeof source === "string",
      key = String(mcid) + (isString ? source : "");
    let r = SourceLib.REFS.get(key);
    if (!r) {
      r = ref(isString ? null : undefined);
      SourceLib.REFS.set(key, r);
    }
    return r as Ref<T | undefined | null>;
  }
}
