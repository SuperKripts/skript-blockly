import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { syntaxlistPlugin } from './syntaxlist-plugin'
import { blocklyPrunePlugin } from './blockly-prune-plugin'
import { syntaxMarkerPlugin } from './syntax-marker-plugin'

const VERSION = process.env.npm_package_version || '0.0.0'
const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL || 'https://github.com'
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || 'SuperKripts/skript-blockly'
const GITHUB_SHA = process.env.GITHUB_SHA || 'unknown'
const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID || 'unknown'
const GITHUB_RUN_NUMBER = process.env.GITHUB_RUN_NUMBER || 'unknown'
const GITHUB_REF_NAME = process.env.GITHUB_REF_NAME || 'unknown'
const GITHUB_TRIGGERING_ACTOR = process.env.GITHUB_TRIGGERING_ACTOR || 'unknown'

// https://vite.dev/config/
export default defineConfig({
  base: '/blockly',
  plugins: [vue(), vueDevTools(), syntaxlistPlugin(), blocklyPrunePlugin(), syntaxMarkerPlugin('./src/blockly/blocks')],
  define: {
    __VERSION__: JSON.stringify(VERSION),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __GITHUB_SHA__: JSON.stringify(GITHUB_SHA),
    __GITHUB_RUN_NUMBER__: JSON.stringify(GITHUB_RUN_NUMBER),
    __GITHUB_RUN_ID__: JSON.stringify(GITHUB_RUN_ID),
    __GITHUB_REF_NAME__: JSON.stringify(GITHUB_REF_NAME),
    __GITHUB_TRIGGERING_ACTOR__: JSON.stringify(GITHUB_TRIGGERING_ACTOR),
    __GITHUB_SERVER_URL__: JSON.stringify(GITHUB_SERVER_URL),
    __GITHUB_REPOSITORY__: JSON.stringify(GITHUB_REPOSITORY),
  },
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
