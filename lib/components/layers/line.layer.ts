import type { LineLayerSpecification } from 'maplibre-gl';
import { createCommentVNode, defineComponent, getCurrentInstance, inject, type PropType, warn, watch } from 'vue';
import { componentIdSymbol, isLoadedSymbol, mapSymbol, sourceIdSymbol } from '@/lib/types';
import { LayerLib } from '@/lib/lib/layer.lib';
import { SourceLib } from '@/lib/lib/source.lib';
import { useDisposableLayer } from '@/lib/composable/useDisposableLayer';

export default /*#__PURE__*/ defineComponent({
  name : 'MglLineLayer',
  props: {
    ...LayerLib.SHARED.props,
    layout: Object as PropType<LineLayerSpecification['layout']>,
    paint : Object as PropType<LineLayerSpecification['paint']>
  },
  emits: [ ...LayerLib.SHARED.emits ],
  setup(props) {

    const sourceId = inject(sourceIdSymbol);

    if (!sourceId && !props.source) {
      warn('Line Layer: layer must be used inside source tag or source prop must be set');
      return;
    }

    const ci        = getCurrentInstance()!,
    map       = inject(mapSymbol)!,
    isLoaded  = inject(isLoadedSymbol)!,
    cid       = inject(componentIdSymbol)!,
    sourceRef = SourceLib.getSourceRef(cid, props.source || sourceId);

    useDisposableLayer(props.layerId!, ci);

    watch([ isLoaded, sourceRef ], ([ il, src ]) => {
      if (il && (src || src === undefined)) {
	map.value!.addLayer(LayerLib.genLayerOpts<LineLayerSpecification>(props.layerId!, 'line', props, sourceId), props.before || undefined);
	LayerLib.registerLayerEvents(map.value!, props.layerId!, ci.vnode);
      }
    }, { immediate: true });

    return () => createCommentVNode('Line Layer');

  }
});
