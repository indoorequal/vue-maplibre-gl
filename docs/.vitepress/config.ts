import { defineConfig } from 'vitepress'
import examplesPath from '../examples/[example].paths.js';

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
    }
  },
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
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/indoorequal/vue-maplibre-gl' }
    ]
  }
})
