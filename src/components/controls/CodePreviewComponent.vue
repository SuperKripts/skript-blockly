<script setup lang="ts">
import highlight, { lineNumbersTransformer } from '@/skript/highlight'
import { useThemeStore } from '@/stores/theme'
import { useWorkspaceStore } from '@/stores/workspace';

const ws = useWorkspaceStore()
const ts = useThemeStore()
</script>

<template>
  <div class="code_view"
    v-html="highlight.codeToHtml(ws.code, { lang: 'Skript', theme: ts.isDark ? 'github-dark-default' : 'github-light-default', transformers: [lineNumbersTransformer()] })">
  </div>
</template>

<style scoped>
.code_view {
  height: 80vh;
}
</style>
