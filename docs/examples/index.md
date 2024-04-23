<script setup>
import { data } from './example.data.js'
</script>

# Examples

Discover the examples.

<ul>
  <li v-for="example of data">
    <a :href="`${example.params.example}`">{{ example.params.title }}</a>:
    {{ example.params.description }}
  </li>
</ul>
