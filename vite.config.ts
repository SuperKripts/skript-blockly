import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { syntaxlistPlugin } from './syntaxlist-plugin'

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
        manualChunks(id) {
          const posixId = id.replace(/\\/g, '/')
          const projectRoot = __dirname.replace(/\\/g, '/')
          if (posixId.startsWith(projectRoot)) {
            const path = posixId.substring(projectRoot.length)
            if (path.startsWith('/src/blockly/blocks/syntaxlist')) {
              return 'syntaxlist'
            }
            if (path.startsWith('/src/blockly/lang/zh-cn') || path.startsWith('/node_modules/blockly/msg/zh-hans')) {
              return 'zh_cn'
            }
            if (path.startsWith('/src/blockly/lang/en_us') || path.startsWith('/node_modules/blockly/msg/en')) {
              return 'en_us'
            }
            if (path.startsWith('/node_modules/blockly') || path.startsWith('/node_modules/@blockly')) {
              return 'blockly'
            }
            if (path.startsWith('/node_modules/vue') || path.startsWith('/node_modules/@vue') || path.startsWith('/node_modules/pinia')) {
              return 'vue'
            }
          }
        },
      },
    },
  },
})
