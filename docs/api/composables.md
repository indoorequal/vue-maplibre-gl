# Composables

## useMap(key?): MapInstance

The `useMap` composable allow a component to get the MapLibre map instance. The key parameter is a reference to the `mapKey` prop of [MglMap](./MglMap.md).

```vue
<script setup>
import { useMap } from '@indoorequal/vue-maplibre-gl';

const map = useMap();
console.log(map.isLoaded)
console.log(map.isMounted)
console.log(map.instance)
console.log(map.map)
</script>
```

## useControl(() => IControl, { position: 'top-left' }): { control, map \}

The `useControl` composable allow to add a maplibre control that implement the IControl interface.

```vue
<script setup>
import { useControl } from '@indoorequal/vue-maplibre-gl';
import MaplibreInspect from '@maplibre/maplibre-gl-inspect';

useControl(() => {
  return new MaplibreInspect();
});
</script>
```
