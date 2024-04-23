# Getting started

```typescript
import VueMaplibreGl from '@indoorequal/vue-maplibre-gl'

app.use(VueMaplibreGl)
```

Add CSS:

```scss
@import "~maplibre-gl/dist/maplibre-gl.css";
@import "~@indoorequal/vue-maplibre-gl/dist/vue-maplibre-gl.css";
```

Use specific components:

```typescript
import { MglMap } from '@indoorequal/vue-maplibre-gl'

app.component('MglMap', MglMap)
```

or in a parent components `.vue` file

```html
<script>
  import { MglMap } from '@indoorequal/vue-maplibre-gl'

  export default {
    components: {
      MglMap
    },
    // ...
  }
</script>
```
