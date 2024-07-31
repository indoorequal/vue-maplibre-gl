# Nuxt


## Using the nuxt-maplibre package (recommended)

The easiest way to integrate maplibre and [Nuxt](https://nuxt.com/) is to use the [nuxt-maplibre](https://github.com/Gugustinette/nuxt-maplibre) package. You can read [the documentation](https://gugustinette.github.io/nuxt-maplibre/).

## Manual use

Maplibre require access to a window and does not works with server side rendering.
To make it works, you can use a [client component](https://nuxt.com/docs/guide/directory-structure/components#client-components).

::: code-group
```vue [map.client.vue]
<template>
  <MglMap>
    <MglNavigationControl />
  </MglMap>
</template>

<script setup>
import 'maplibre-gl/dist/maplibre-gl.css';
import { MglMap, MglNavigationControl } from '@indoorequal/vue-maplibre-gl';
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
