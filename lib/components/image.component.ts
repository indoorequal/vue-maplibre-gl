import { defineComponent, inject, type PropType, warn } from "vue";
import { type StyleImageInterface, type StyleImageMetadata } from "maplibre-gl";
import { mapSymbol } from "@/lib/types";

/**
 * Load an image to maplibre to use in the style
 *
 * See [#addImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage) and [#loadImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#loadimage)
 * @since 8.2.0
 */
export default defineComponent({
  name: "MglImage",
  props: {
    /**
     * Image id
     */
    id: {
      type: String as unknown as PropType<string>,
      required: true,
    },
    /**
     * The image data to add
     * The image as an HTMLImageElement, ImageData, ImageBitmap or object with width, height, and data properties with the same format as ImageData.
     * Required if the url props is not set
     */
    image: Object as PropType<
      | HTMLImageElement
      | ImageBitmap
      | ImageData
      | {
          width: number;
          height: number;
          data: Uint8Array | Uint8ClampedArray;
        }
      | StyleImageInterface
    >,
    /**
     * The image url to load via map#loadImage
     * Required if the image props is not set
     */
    url: String as PropType<string>,
    /**
     * The options
     */
    options: Object as PropType<Partial<StyleImageMetadata>>,
  },
  setup(props) {
    const map = inject(mapSymbol);
    if (!props.url && !props.image) {
      warn(`${props.id} image: missing prop url or image`);
      return () => [];
    }
    if (map!.value!.hasImage(props.id)) return;
    (async () => {
      let image = props.image;
      if (props.url) {
        image = (await map!.value!.loadImage(props.url)).data;
      }
      map!.value!.addImage(props.id, image!, props.options);
    })();

    return () => [];
  },
});
