import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import banner from 'vite-plugin-banner';
import { resolve } from 'path';
// @ts-ignore - Webstorm is complaining somehow
import pkg from './package.json' assert { type: 'json' };
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('.', import.meta.url)) }
    ]
  },
  plugins: [
    vue(),
    dts({ insertTypesEntry: true }),
    banner(`/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author}
* @license ${pkg.license}
*/`)
  ],
  ssr    : {
    external: [ 'vue', 'maplibre-gl', 'geojson' ]
  },
  build  : {
    sourcemap    : true,
    lib          : {
      entry   : resolve(__dirname, 'lib/main.ts'),
      name    : 'VueMaplibreGl',
      fileName: format => `vue-maplibre-gl.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
	'vue',
	'maplibre-gl',
	'geojson'
      ],
      output  : {
	assetFileNames: (assetInfo) => {
	  return assetInfo.name;
	},
	exports       : 'named',
	// Provide global variables to use in the UMD build
	// for externalized deps
	globals: {
	  vue          : 'Vue',
	  'maplibre-gl': 'maplibregl',
	  geojson      : 'geojson'
	},
      },
    }
  },
});
