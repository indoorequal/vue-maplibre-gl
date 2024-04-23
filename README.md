# @indoorequal/vue-maplibre-gl

[![npm](https://img.shields.io/npm/v/@indoorequal/vue-maplibre-gl.svg?style=flat-square)](https://www.npmjs.com/package/@indoorequal/vue-maplibre-gl)
[![npm](https://img.shields.io/npm/dm/@indoorequal/vue-maplibre-gl?style=flat-square)](https://www.npmjs.com/package/@indoorequal/vue-maplibre-gl)
[![size](https://img.shields.io/bundlephobia/minzip/@indoorequal/vue-maplibre-gl?label=size&style=flat-square)](https://bundlephobia.com/package/@indoorequal/vue-maplibre-gl)
[![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg?style=flat-square)](https://vuejs.org/)
[![MaplibreGL-JS](https://img.shields.io/badge/Maplibre%20GL%20JS-3.x-brightgreen?style=flat-square)](https://maplibre.org/projects/maplibre-gl-js/)
[![TypeScript](https://img.shields.io/badge/-TypeScript-informational?style=flat-square)](https://www.typescriptlang.org/)

A small Vue 3 plugin for [maplibre-gl-js](https://github.com/maplibre/maplibre-gl-js). Only additional dependency is [mitt](https://github.com/developit/mitt).

This is a fork of [vue-maplibre-gl](https://github.com/razorness/vue-maplibre-gl).

## Features

- Supports MapLibre GL JS v3.x
- Typescript support
- Components for map, controls, sources, markers and layers
- Support for custom controls
- Customizable style switch which reloads sources and layers automatically
- Frame rate control included
- Support for multiple instances and global access by `useMap(key: string | symbol)`
- Simple way to switch displayed map language
- Automatic restart on CONTEXT_LOST_WEBGL which can happen on mobile devices when tab was in background for longer time 
- Small size

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```shell
yarn add @indoorequal/vue-maplibre-gl maplibre-gl mitt
```

## Default import

Global Install:

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

# Usage

See [examples/App.vue](src/App.vue) for a real world example.

# Demo

```shell
git clone https://github.com/indoorequal/vue-maplibre-gl.git
cd vue-maplibre-gl
yarn
yarn examples
```

## PRs welcome ♥

If you have ideas, improvements, suggestions etc. don't hesitate to open a pull request.

### Todos

- [ ] Usage examples
- [ ] Demo
- [ ] API documentation
- [ ] Support `v-model:...` for some basic props
- [x] Add layer events
- [ ] Add [Web-types](https://github.com/JetBrains/web-types)
- [x] Add [frame rate control](https://github.com/mapbox/mapbox-gl-framerate)

## License

[MIT](http://opensource.org/licenses/MIT)
