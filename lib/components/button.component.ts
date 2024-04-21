import { defineComponent, h, type PropType, ref, type SlotsType, warn, watch } from 'vue';

export enum ButtonType {
  DEFAULT     = 'default',
  TEXT        = 'text',
  MDI         = 'mdi',
  SIMPLE_ICON = 'simple-icons',
}

export const ButtonTypeValues = Object.values(ButtonType);

interface Default {
  size: number;
  viewbox: string;
}

const types: { [key in ButtonType]?: Default } = {
  [ ButtonType.TEXT ]       : undefined,
  [ ButtonType.MDI ]        : {
    size   : 21,
    viewbox: '0 0 24 24'
  },
  [ ButtonType.SIMPLE_ICON ]: {
    size   : 21,
    viewbox: '0 0 24 24'
  },
  [ ButtonType.DEFAULT ]    : {
    size   : 0,
    viewbox: '0 0 0 0'
  }
};


export default /*#__PURE__*/ defineComponent({
  name : 'MglButton',
  props: {
    type   : {
      type     : String as PropType<ButtonType | 'default' | 'text' | 'mdi' | 'simple-icons'>,
      default  : ButtonType.DEFAULT,
      validator: (v: ButtonType) => {
	return ButtonTypeValues.indexOf(v) !== -1;
      }
    },
    path   : {
      type: String as PropType<string>
    },
    size   : Number as PropType<number>,
    viewbox: String as PropType<string>
  },
  slots: Object as SlotsType<{ default: {} }>,
  setup(props, { slots }) {

    if (!props.path && props.type !== ButtonType.TEXT) {
      warn('property `path` must be set on MaplibreButton');
    }

    const defaults = ref(types[ props.type ] || types.default);
    watch(() => props.type, v => defaults.value = types[ v ] || types.default);

    return () => {
      if (props.type === ButtonType.TEXT) {
	return h('button', { type: 'button' }, slots.default?.({}));
      }
      return h('button', { type: 'button', 'class': 'maplibregl-ctrl-icon' },
	       [
	h(
	  'svg',
	  {
	    width  : props.size || defaults.value!.size,
	    height : props.size || defaults.value!.size,
	    viewBox: props.viewbox || defaults.value!.viewbox
	  },
	  h('path', { fill: 'currentColor', d: props.path })
	),
	slots.default?.({})
      ]
	      );
    };

  }
});
