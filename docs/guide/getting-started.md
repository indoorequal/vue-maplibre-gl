# Getting started

## Import

### All components

```typescript
import 'maplibre-gl/dist/maplibre-gl.css';
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl'

app.use(VueMaplibreGl)
```

### Specific components

```typescript
import 'maplibre-gl/dist/maplibre-gl.css';
import { MglMap } from '@indoorequal/vue-maplibre-gl';

app.component('MglMap', MglMap);
```

### Single-File-Components

```html
<template>
  <mgl-map ... />
</template>
<script setup>
  import { MglMap } from '@indoorequal/vue-maplibre-gl';
</script>
<style lang="css">
  @import "maplibre-gl/dist/maplibre-gl.css";
</style>
```

## Displaying a map

```html
<template>
  <mgl-map map-style="https://demotiles.maplibre.org/style.json" />
</template>
<script setup>
  import { MglMap } from '@indoorequal/vue-maplibre-gl';
</script>
<style lang="css">
  @import "maplibre-gl/dist/maplibre-gl.css";
</style>
```
