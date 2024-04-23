import type { App, Plugin } from "vue";
import "@/lib/css/maplibre.scss";

// Import vue components
import * as components from "@/lib/components";

// install function executed by Vue.use()
const install: Exclude<Plugin["install"], undefined> =
  function installVueMaplibreGl(app: App) {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  };

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "@/lib/components";

// addition exports
export * from "@/lib/types";
export { useMap } from "@/lib/lib/mapRegistry";
export { defaults as MglDefaults } from "@/lib/defaults";
export { Position } from "@/lib/components/controls/position.enum";
export { usePositionWatcher } from "@/lib/composable/usePositionWatcher";
export { useSource } from "@/lib/composable/useSource";
export { useDisposableLayer } from "@/lib/composable/useDisposableLayer";
