# Getting started

```typescript
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl'

app.use(VueMaplibreGl)
```

Add CSS:

```scss
@import "~maplibre-gl/dist/maplibre-gl.css";
```

Use specific components:

```typescript
import { MglMap } from '@indoorequal/vue-maplibre-gl'

app.component('MglMap', MglMap)
```

or in a parent components `.vue` file

```html
<template>
  <mgl-map /
</template>
<script setup>
  import { MglMap } from '@indoorequal/vue-maplibre-gl';
</script>
```
