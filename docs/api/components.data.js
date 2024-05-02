import { parse } from 'vue-docgen-api';
import { createMarkdownRenderer } from 'vitepress';

function formatProps(props) {
  return props ? `
## Props

| Name | Description | Type | Required | Default value |
|------|-------------|------|----------|---------------|
${props.map((prop) => {
  return [prop.name, prop?.description?.replaceAll('\n', '  '), prop.type?.name, prop.required || false, prop.defaultValue?.value].join('|')
 }).join('\n')}
` : '';
}

function formatEvents(events) {
  return events ? `
## Events

| Name | Description | Properties |
|------|-------------|------------|
${events.map((event) => {
  return [event.name, event.description, event.type].join('|')
 }).join('\n')}
` : '';
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
  return slots ? `
## Slots

| Name          | Description  | Bindings |
| ------------- | ------------ | -------- |
${slots.map((slot) => {
  const { description, bindings, name } = slot;
  const readableBindings = bindings ? formatBindings(bindings) : '';
  return [name, description, bindings].join('|');
}).join('\n')}
` : '';
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
      let componentInfo = await parse(file);
      const type = file.split('/').reverse()[1];
      const propsMarkdown = formatProps(componentInfo.props);
      const eventsMarkdown = formatEvents(componentInfo.events);
      const slotsMarkdown = formatEvents(componentInfo.slots);

      return {
        params: {
          component: componentInfo.displayName,
          title: componentInfo.displayName,
          description: markdownRenderer.render(componentInfo.description),
          type,
        },
        content: `
::: warning
The API documentation is in progress
:::

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
