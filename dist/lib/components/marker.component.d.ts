import { PropType } from 'vue';
import { LngLatLike, PointLike, PositionAnchor } from 'maplibre-gl';
/**
 * Creates a marker component
 *
 * See [Marker](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker).
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * Marker coordinates
     */
    coordinates: {
        type: PropType<LngLatLike>;
        required: true;
    };
    /**
     * Space-separated CSS class names to add to marker container
     * @since 8.3.0
     */
    className: PropType<string>;
    /**
     * The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up.
     */
    offset: PropType<PointLike>;
    /**
     * A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker#setLngLat. Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Default Value 'center'
     */
    anchor: PropType<PositionAnchor>;
    /**
     * The color to use for the default marker if options.element is not provided. The default is light blue. Default Value '#3FB1CE'
     */
    color: PropType<string>;
    /**
     * A boolean indicating whether or not a marker is able to be dragged to a new position on the map. Default Value false
     */
    draggable: PropType<boolean>;
    /**
     * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. Default Value 0
     */
    clickTolerance: PropType<number>;
    /**
     * The rotation angle of the marker in degrees, relative to its respective rotationAlignment setting. A positive value will rotate the marker clockwise. Default Value 0
     */
    rotation: PropType<number>;
    /**
     * map aligns the Marker's rotation relative to the map, maintaining a bearing as the map rotates. viewport aligns the Marker's rotation relative to the viewport, agnostic to map rotations. auto is equivalent to viewport. Default Value 'auto'
     */
    rotationAlignment: PropType<"map" | "viewport" | "auto">;
    /**
     * map aligns the Marker to the plane of the map. viewport aligns the Marker to the plane of the viewport. auto automatically matches the value of rotationAlignment. Default Value 'auto'
     */
    pitchAlignment: PropType<"map" | "viewport" | "auto">;
    /**
     * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px. Default Value 1
     */
    scale: PropType<number>;
    /**
     * Marker's opacity when it's in clear view (not behind 3d terrain). Default value `1`
     * @since 7.0.0
     */
    opacity: PropType<string>;
    /**
     * Marker's opacity when it's behind 3d terrain
     * @defaultValue `0.2`
     * @since 7.0.0
     */
    opacityWhenCovered: PropType<string>;
    /**
     * If true, rounding is disabled for placement of the marker, allowing for subpixel positioning and smoother movement when the marker is translated.
     * @since 7.5.0
     */
    subpixelPositioning: {
        type: PropType<boolean>;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("dragstart" | "drag" | "dragend" | "update:coordinates")[], "dragstart" | "drag" | "dragend" | "update:coordinates", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * Marker coordinates
     */
    coordinates: {
        type: PropType<LngLatLike>;
        required: true;
    };
    /**
     * Space-separated CSS class names to add to marker container
     * @since 8.3.0
     */
    className: PropType<string>;
    /**
     * The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up.
     */
    offset: PropType<PointLike>;
    /**
     * A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker#setLngLat. Options are 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'. Default Value 'center'
     */
    anchor: PropType<PositionAnchor>;
    /**
     * The color to use for the default marker if options.element is not provided. The default is light blue. Default Value '#3FB1CE'
     */
    color: PropType<string>;
    /**
     * A boolean indicating whether or not a marker is able to be dragged to a new position on the map. Default Value false
     */
    draggable: PropType<boolean>;
    /**
     * The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. Default Value 0
     */
    clickTolerance: PropType<number>;
    /**
     * The rotation angle of the marker in degrees, relative to its respective rotationAlignment setting. A positive value will rotate the marker clockwise. Default Value 0
     */
    rotation: PropType<number>;
    /**
     * map aligns the Marker's rotation relative to the map, maintaining a bearing as the map rotates. viewport aligns the Marker's rotation relative to the viewport, agnostic to map rotations. auto is equivalent to viewport. Default Value 'auto'
     */
    rotationAlignment: PropType<"map" | "viewport" | "auto">;
    /**
     * map aligns the Marker to the plane of the map. viewport aligns the Marker to the plane of the viewport. auto automatically matches the value of rotationAlignment. Default Value 'auto'
     */
    pitchAlignment: PropType<"map" | "viewport" | "auto">;
    /**
     * The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px. Default Value 1
     */
    scale: PropType<number>;
    /**
     * Marker's opacity when it's in clear view (not behind 3d terrain). Default value `1`
     * @since 7.0.0
     */
    opacity: PropType<string>;
    /**
     * Marker's opacity when it's behind 3d terrain
     * @defaultValue `0.2`
     * @since 7.0.0
     */
    opacityWhenCovered: PropType<string>;
    /**
     * If true, rounding is disabled for placement of the marker, allowing for subpixel positioning and smoother movement when the marker is translated.
     * @since 7.5.0
     */
    subpixelPositioning: {
        type: PropType<boolean>;
        default: boolean;
    };
}>> & Readonly<{
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDrag?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    "onUpdate:coordinates"?: ((...args: any[]) => any) | undefined;
}>, {
    subpixelPositioning: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
