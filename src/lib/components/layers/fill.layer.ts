import { FillLayer, FillLayout, FillPaint } from 'maplibre-gl';
import { createCommentVNode, defineComponent, getCurrentInstance, inject, PropType, warn, watch } from 'vue';
import { componentIdSymbol, isLoadedSymbol, mapSymbol, sourceIdSymbol, sourceLayerRegistry } from '@/lib/types';
import { LayerLib } from '@/lib/lib/layer.lib';
import { SourceLib } from '@/lib/lib/source.lib';
import { useDisposableLayer } from '@/lib/composable/useDisposableLayer';

export default defineComponent({
	name : 'MglFillLayer',
	props: {
		...LayerLib.SHARED.props,
		layout: Object as PropType<FillLayout>,
		paint : Object as PropType<FillPaint>
	},
	emits: [ ...LayerLib.SHARED.emits ],
	setup(props) {

		const sourceId = inject(sourceIdSymbol);

		if (!sourceId && !props.source) {
			warn('Fill Layer: layer must be used inside source tag or source prop must be set');
			return;
		}

		const ci        = getCurrentInstance()!,
			  map       = inject(mapSymbol)!,
			  isLoaded  = inject(isLoadedSymbol)!,
			  cid       = inject(componentIdSymbol)!,
			  registry  = inject(sourceLayerRegistry)!,
			  sourceRef = SourceLib.getSourceRef(cid, props.source || sourceId);

		useDisposableLayer(props.layerId!, ci);

		watch([ isLoaded, sourceRef ], ([ il, src ]) => {
			if (il && (src || src === undefined)) {
				map.value.addLayer(LayerLib.genLayerOpts<FillLayer>(props.layerId!, 'fill', props, sourceId), props.before || undefined);
				LayerLib.registerLayerEvents(map.value, props.layerId!, ci.vnode);
			}
		}, { immediate: true });

	},
	render() {
		return createCommentVNode('Fill Layer');
	}
});
