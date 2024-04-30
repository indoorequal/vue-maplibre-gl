import { defineConfig } from 'vitepress'
import examplesPath from '../examples/[example].paths.js';
import componentsPath from '../api/[component].paths.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@indoorequal/vue-maplibre-gl",
  description: "Vue 3 plugin for maplibre-gl",
  base: process.env.NODE_ENV === 'production' ? '/vue-maplibre-gl/': '/',
  transformPageData: (pageData, { siteConfig }) => {
    if (pageData.filePath.startsWith('examples/') && pageData.filePath != 'examples/index.md') {
      return {
        title: `${pageData.params.title} - Examples`
      }
    } else if (pageData.filePath.startsWith('api/') && !['api/index.md', 'api/composables.md'].includes(pageData.filePath)) {
      return {
        title: `${pageData.params.title} - API`
      }
    }
  },
  head: [
    [
      'script',
      { defer: '', 'data-domain': 'indoorequal.github.io/vue-maplibre-gl', src: 'https://plausible.io/js/script.js' }
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Getting started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Examples',
        link: '/examples/',
        items: examplesPath.paths().map((example) => {
          return {
            text: example.params.title,
            link: `/examples/${example.params.example}`
          };
        })
      },
      {
        text: 'API',
        link: '/api/',
        items: [
          {
            text: 'Components',
            items: [...(await componentsPath.paths()).reduce((memo, component) => {
              const type = component.params.type;
              if (!memo.has(type)) {
                memo.set(type, []);
              }
              memo.get(type).push(component);
              return memo;
            }, new Map()).entries()].flatMap(([type, components]) => {
              components.sort((a, b) => a.params.component.localeCompare(b.params.component) );
              if (type === 'components') {
                return components.map((component) => {
                  return {
                    text: component.params.title,
                    link: `/api/${component.params.component}`
                  };
                });
              }
              return {
                text: type[0].toUpperCase() + type.slice(1),
                items: components.map((component) => {
                  return {
                    text: component.params.title,
                    link: `/api/${component.params.component}`
                  };
                })
              };
            })
          },
          {
            text: 'Composables',
            link: '/api/composables'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/indoorequal/vue-maplibre-gl' }
    ]
  }
})
