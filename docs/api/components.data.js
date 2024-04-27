import { parse } from 'vue-docgen-api';

export default {
  watch: [
    '../../lib/components/*.component.ts',
    '../../lib/components/controls/*.control.ts',
    '../../lib/components/sources/*.source.ts',
    '../../lib/components/layers/*.layer.ts',
  ],
  async load(watchedFiles) {
    return Promise.all(watchedFiles.map(async (file) => {
      let componentInfo = await parse(file);

      const type = file.split('/').reverse()[1];
      const propsMarkdown = componentInfo.props ? `
## Props

| Name | Description | Type | Required | Default value |
|------|-------------|------|----------|---------------|
${componentInfo.props.map((prop) => {
  return [prop.name, prop?.description?.replaceAll('\n', '  '), prop.type?.name, prop.required || false, prop.defaultValue?.value].join('|')
 }).join('\n')}
` : '';

      const eventsMarkdown = componentInfo.events ? `
## Events

| Name | Description | Properties |
|------|-------------|------------|
${componentInfo.events.map((event) => {
  return [event.name, event.description, event.type].join('|')
 }).join('\n')}
` : '';


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
      const slotsMarkdown = componentInfo.slots ? `
## Slots

| Name          | Description  | Bindings |
| ------------- | ------------ | -------- |
${componentInfo.slots.map((slot) => {
  const { description, bindings, name } = slot;
  const readableBindings = bindings ? formatBindings(bindings) : '';
  return [name, description, bindings].join('|');
}).join('\n')}
` : '';

      return {
        params: {
          component: componentInfo.displayName,
          title: componentInfo.displayName,
          description: componentInfo.description,
          type,
        },
        content: `
${componentInfo.description}

\`\`\`typescript
import { ${componentInfo.displayName} } from '@indoorequal/vue-maplibre-gl';
\`\`\`

${propsMarkdown}

${eventsMarkdown}

${slotsMarkdown}

See [source](https://github.com/indoorequal/vue-maplibre-gl/tree/master/${componentInfo.sourceFiles[0]}).
`
      };
    }));
  }
}
