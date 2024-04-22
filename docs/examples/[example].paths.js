import fs from 'node:fs';
import path from 'path';
import examplesData from './example.data.js';

export default {
  paths() {
    const examplesFolder = path.join('./docs/examples');
    const files = fs.readdirSync(examplesFolder)
          .filter(f => f.endsWith('vue'))
          .map(f => examplesFolder + '/' + f);
    return examplesData.load(files);
  }
}
