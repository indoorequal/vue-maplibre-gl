<script setup>
import { data } from './components.data.js';
const byType = data.reduce((memo, component) => {
  const type = component.params.type;
  if (!memo.has(type)) {
    memo.set(type, []);
  }
  memo.get(type).push(component);
  return memo;
}, new Map());
</script>

# API

::: warning
The API documentation is in progress
:::

## Components

<template v-for="[type, components] of byType.entries()">
  <h3 v-if="type != 'components'">{{ type[0].toUpperCase() }}{{ type.slice(1) }}</h3>
  <ul>
    <li v-for="component of components.sort()">
      <a :href="`${component.params.component}`">{{ component.params.title }}</a>
      <div v-html="component.params.description"></div>
     </li>
  </ul>
</template>

## Composables

- [useMap](./composables.md#usemap)
- [useControl](./composables.md#usecontrol)
