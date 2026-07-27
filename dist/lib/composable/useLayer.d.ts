import { LayersWithSource, LayerProps } from '../lib/layer.lib';
export declare function useLayer<T extends LayersWithSource>(name: string, props: LayerProps<T>): (() => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>) | undefined;
