import { PropType } from 'vue';
import { StyleImageInterface, StyleImageMetadata } from 'maplibre-gl';
/**
 * Load an image to maplibre to use in the style.
 * If the image id already exist, nothing is done.
 *
 * See [#addImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage) and [#loadImage](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#loadimage)
 * @since 8.2.0
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Image id
     */
    id: {
        type: PropType<string>;
        required: true;
    };
    /**
     * The image data to add
     * The image as an HTMLImageElement, ImageData, ImageBitmap or object with width, height, and data properties with the same format as ImageData.
     * Required if the url props is not set
     */
    image: PropType<HTMLImageElement | ImageBitmap | ImageData | {
        width: number;
        height: number;
        data: Uint8Array | Uint8ClampedArray;
    } | StyleImageInterface>;
    /**
     * The image url to load via map#loadImage
     * Required if the image props is not set
     */
    url: PropType<string>;
    /**
     * The options
     */
    options: PropType<Partial<StyleImageMetadata>>;
}>, (() => never[]) | undefined, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Image id
     */
    id: {
        type: PropType<string>;
        required: true;
    };
    /**
     * The image data to add
     * The image as an HTMLImageElement, ImageData, ImageBitmap or object with width, height, and data properties with the same format as ImageData.
     * Required if the url props is not set
     */
    image: PropType<HTMLImageElement | ImageBitmap | ImageData | {
        width: number;
        height: number;
        data: Uint8Array | Uint8ClampedArray;
    } | StyleImageInterface>;
    /**
     * The image url to load via map#loadImage
     * Required if the image props is not set
     */
    url: PropType<string>;
    /**
     * The options
     */
    options: PropType<Partial<StyleImageMetadata>>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
