import { globSync } from 'glob'
import componentsData from './components.data.js';

export default {
  paths() {
    const files = componentsData.watch.flatMap((glob) => {
      return globSync(glob.slice(4));
    });
    return componentsData.load(files);
  }
}
