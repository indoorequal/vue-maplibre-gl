import { PropType } from 'vue';
import { LngLatLike, Offset, PositionAnchor } from 'maplibre-gl';
/**
 * A popup component
 *
 * See [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/).
 */
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /**
     * The geographical location of the popup's anchor.
     * Unused when placed inside a marker.
     */
    coordinates: {
        type: PropType<LngLatLike>;
        required: false;
    };
    /**
     * Display a close button in the top right corner.
     */
    closeButton: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * The popup will be closed when the map is clicked.
     */
    closeOnClick: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * The popup will be closed when the map moves.
     */
    closeOnMove: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * The popup will try to focus the first focusable element inside the popup.
     */
    focusAfterOpen: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * A string indicating the part of the Popup that should
     * be positioned closest to the coordinate.
     * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`,
     * `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset the anchor will be
     * dynamically set to ensure the popup falls within the map container with a preference
     * for `'bottom'`.
     */
    anchor: {
        type: PropType<PositionAnchor>;
        required: false;
    };
    /**
     * A pixel offset applied to the popup's location
     */
    offset: {
        type: PropType<Offset>;
        required: false;
    };
    /**
     * Space-separated CSS class names to add to popup container
     */
    className: {
        type: PropType<string>;
        required: false;
    };
    /**
     * A string that sets the CSS property of the popup's maximum width, eg `'300px'`.
     * To ensure the popup resizes to fit its content, set this property to `'none'`.
     */
    maxWidth: {
        type: PropType<string>;
        default: string;
    };
    /**
     * If true, rounding is disabled for placement of the popup, allowing for subpixel positioning and smoother movement when the popup is translated.
     * @since 7.1.0
     */
    subpixelPositioning: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * Sets the popup's content to a string of text.
     */
    text: {
        type: PropType<string>;
        required: false;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("close" | "open")[], "close" | "open", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /**
     * The geographical location of the popup's anchor.
     * Unused when placed inside a marker.
     */
    coordinates: {
        type: PropType<LngLatLike>;
        required: false;
    };
    /**
     * Display a close button in the top right corner.
     */
    closeButton: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * The popup will be closed when the map is clicked.
     */
    closeOnClick: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * The popup will be closed when the map moves.
     */
    closeOnMove: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * The popup will try to focus the first focusable element inside the popup.
     */
    focusAfterOpen: {
        type: PropType<boolean>;
        required: false;
        default: boolean;
    };
    /**
     * A string indicating the part of the Popup that should
     * be positioned closest to the coordinate.
     * Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`,
     * `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset the anchor will be
     * dynamically set to ensure the popup falls within the map container with a preference
     * for `'bottom'`.
     */
    anchor: {
        type: PropType<PositionAnchor>;
        required: false;
    };
    /**
     * A pixel offset applied to the popup's location
     */
    offset: {
        type: PropType<Offset>;
        required: false;
    };
    /**
     * Space-separated CSS class names to add to popup container
     */
    className: {
        type: PropType<string>;
        required: false;
    };
    /**
     * A string that sets the CSS property of the popup's maximum width, eg `'300px'`.
     * To ensure the popup resizes to fit its content, set this property to `'none'`.
     */
    maxWidth: {
        type: PropType<string>;
        default: string;
    };
    /**
     * If true, rounding is disabled for placement of the popup, allowing for subpixel positioning and smoother movement when the popup is translated.
     * @since 7.1.0
     */
    subpixelPositioning: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * Sets the popup's content to a string of text.
     */
    text: {
        type: PropType<string>;
        required: false;
    };
}>> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
}>, {
    maxWidth: string;
    subpixelPositioning: boolean;
    closeButton: boolean;
    closeOnClick: boolean;
    closeOnMove: boolean;
    focusAfterOpen: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
