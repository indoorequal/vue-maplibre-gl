import { parse } from 'vue-docgen-api';
import { createMarkdownRenderer } from 'vitepress';

function formatProps(props) {
  return props ? '## Props\n\n' + props.map((prop) => {
    const deprecated = formatDeprecated(prop.tags);
    const since = formatSince(prop.tags);
    const vmodel = formatVmodel(prop.tags);

    return `
### ${prop.name} ${since} {#${prop.name}}

${deprecated}

- **Type**: \`${prop.type?.name}\`
- **Required**: \`${prop.required || false}\`
- **Default**: \`${prop.defaultValue?.value}\`
${vmodel}

${prop.description || ''}
`
  }).join('\n') : '';
}

function formatEvents(events) {
  return events ? '## Events\n\n' + events.map((event) => {
    return `
### ${event.name}

${event.description || ''}
`;
  }).join('\n') : '';
}

const formatBindings = (bindings) => {
  if (!bindings) {
    return ''
  }
  return bindings
    .map(binding => {
      const { name, description, type } = binding
      if (!type) {
	return ''
      }
      return `**${name}** \`${
	type.name === 'union' && type.elements
	? type.elements.map(({ name: insideName }) => insideName).join(', ')
	: type.name
       }\` - ${description}`
    })
    .join('\n')
}

function formatSlots(slots) {
  return slots ? '## Slots\n\n' + slots.map((slot) => {
    const { description, bindings, name } = slot;
    const readableBindings = bindings ? formatBindings(bindings) : '';
    return `
### ${name}

${description}

${bindings}
`
  }).join('\n') : '';
}

function formatDeprecated(tags) {
  return tags?.deprecated ?
        tags.deprecated.map((deprecated) => {
          return `
::: warning Deprecated
${deprecated.description}
:::
`;
        }).join('\n') : '';
}

function formatSince(tags) {
  return tags?.since ?
        tags.since.map((s) => {
          return `(since ${s.description})`;
        }).join('') : '';
}

function formatVmodel(tags) {
  return tags?.vmodel ?
        tags.vmodel.map((s) => {
          return `- **Sincable**: ${s.description}`;
        }).join('') : '';
}

export default {
  watch: [
    '../../lib/components/*.component.ts',
    '../../lib/components/controls/*.control.ts',
    '../../lib/components/sources/*.source.ts',
    '../../lib/components/layers/*.layer.ts',
  ],
  async load(watchedFiles) {
    const markdownRenderer = await createMarkdownRenderer();
    return Promise.all(watchedFiles.map(async (file) => {
      const componentInfo = await parse(file);
      const type = file.split('/').reverse()[1];
      const propsMarkdown = formatProps(componentInfo.props);
      const eventsMarkdown = formatEvents(componentInfo.events);
      const slotsMarkdown = formatSlots(componentInfo.slots);
      const deprecated = formatDeprecated(componentInfo.tags);
      const since = formatSince(componentInfo.tags);

      return {
        params: {
          component: componentInfo.displayName,
          title: componentInfo.displayName,
          description: markdownRenderer.render(componentInfo.description),
          since,
          type,
        },
        content: `
${deprecated}

${componentInfo.description}

\`\`\`typescript
import { ${componentInfo.displayName} } from '@indoorequal/vue-maplibre-gl';
\`\`\`

${propsMarkdown}

${eventsMarkdown}

${slotsMarkdown}

## Source

See [source](https://github.com/indoorequal/vue-maplibre-gl/tree/master/${componentInfo.sourceFiles[0]}).
`
      };
    }));
  }
}
