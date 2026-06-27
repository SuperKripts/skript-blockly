import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { syntaxlistPlugin } from './syntaxlist-plugin'
import { blocklyPrunePlugin } from './blockly-prune-plugin'
import { syntaxMarkerPlugin } from './syntax-marker-plugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/blockly',
  plugins: [vue(), vueDevTools(), syntaxlistPlugin(), blocklyPrunePlugin(), syntaxMarkerPlugin('./src/blockly/blocks')],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 'blockly/blocks': resolve(__dirname, './src/blockly/defblocks.ts'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/blockly') || id.includes('node_modules/@blockly')) {
            return 'blockly'
          }

          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router') || id.includes('node_modules/pinia') || id.includes('node_modules/vue-i18n')) {
            return 'vue'
          }

          if (id.includes('node_modules/shiki') || id.includes('node_modules/@shiki') || id.includes('skript-grammar.json')) {
            return 'shiki'
          }

          if (id.includes('node_modules/pinyin-pro')) {
            return 'pinyin'
          }
        },
        chunkFileNames(chunkInfo) {
          if (chunkInfo.facadeModuleId?.includes('/locales/')) {
            return 'lang/[name]-[hash].js'
          }
          return 'assets/[name]-[hash].js'
        },
      },
    },
  },
})
