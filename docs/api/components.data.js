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
  return [prop.name, prop?.description?.replaceAll('\n', '  '), prop.type?.name, prop.required, prop.defaultValue?.value].join('|')
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

      return {
        params: {
          component: componentInfo.displayName,
          title: componentInfo.displayName,
          type,
        },
        content: `
${componentInfo.description}

\`\`\`typescript
import { ${componentInfo.displayName} } from '@indoorequal/vue-maplibre-gl';
\`\`\`

${propsMarkdown}

${eventsMarkdown}

See [source](https://github.com/indoorequal/vue-maplibre-gl/tree/master/${componentInfo.sourceFiles[0]}).
`
      };
    }));
  }
}
