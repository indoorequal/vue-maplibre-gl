import fs from 'node:fs';
import path from 'node:path';

function removeComment(str) {
  return str.replace(/^\/\/ /, '');
}

export default {
  watch: ['./*.vue'],
  load(watchedFiles) {
    return watchedFiles.map((file) => {
      const vueContent = fs.readFileSync(file, 'utf-8').split('\n');
      const title = removeComment(vueContent[0]);
      const description = removeComment(vueContent[2]);
      const content = `
<script setup>
import { defineClientComponent } from 'vitepress';

const Example = defineClientComponent(
  () => import('./${path.basename(file)}')
);
</script>

<Example />
\`\`\`vue
${vueContent.slice(3).join('\n').replaceAll('?key=', '?key=get_your_own_api_key_')}
\`\`\`
`;
      return {
        params: {
          example: path.basename(file, '.vue'),
          title,
          description,
        },
        content,
      };
    });
  }
}
