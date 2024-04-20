import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  ssr: {
    external: [ 'vue', 'maplibre-gl', 'geojson', 'mitt' ]
  },
  server : {
    host : '0.0.0.0',
    watch: {
      // to avoid full page reloads on file changes
      ignored: [/node_modules/ ]
    }
  }
});
