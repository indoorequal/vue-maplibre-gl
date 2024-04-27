<script setup>
import { data } from './components.data.js'
</script>

# API

::: warning
The API documentation is in progress
:::

## Components

<ul>
  <li v-for="component of data">
    <a :href="`${component.params.component}`">{{ component.params.title }}</a>:
    {{ component.params.description }}
  </li>
</ul>
