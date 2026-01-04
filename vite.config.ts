import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { syntaxlistPlugin } from './syntaxlist-plugin'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/blockly',
  plugins: [vue(), vueDevTools(), syntaxlistPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          blockly: ['blockly'],
          vue: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
          shiki: ['shiki', resolve(__dirname, 'src/assets/skript-grammar.json')],
          // syntaxlist: [resolve(__dirname, 'src/blockly/blocks/syntaxlist.json')],
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
