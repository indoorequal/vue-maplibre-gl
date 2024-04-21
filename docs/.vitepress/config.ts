import { defineConfig } from 'vitepress'
import examplesPath from '../examples/[example].paths.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-maplibre-gl",
  description: "Vue 3 plugin for maplibre-gl",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: [
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
