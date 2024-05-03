# Nuxt

vue-maplibre-gl is compatible with [Nuxt](https://nuxt.com/). Maplibre require access to a window and does not works with server side rendering.
The easiest way to use is to use a [client component](https://nuxt.com/docs/guide/directory-structure/components#client-components).

::: code-group
```vue [map.client.vue]
<template>
  <MglMap>
    <MglNavigationControl />
  </MglMap>
</template>

<script setup>
import "maplibre-gl/dist/maplibre-gl.css";
import "@indoorequal/vue-maplibre-gl/dist/vue-maplibre-gl.css";
import { MglMap, MglNavigationControl } from @indoorequal/vue-maplibre-gl';
</script>
```
:::

You can then use your map component, it will be rendered only on client side.
::: code-group
```vue [app.vue]
<template>
  <div>
    <!-- this component will only be rendered on client side -->
    <Map />
  </div>
</template>
:::
