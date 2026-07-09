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

<style>
.code_view pre {
  counter-reset: line;
}

.code_view .line {
  position: relative;
  padding-left: 3.5em;
  min-height: 1.2em;
}

.code_view .line::before {
  content: attr(data-line);
  position: absolute;
  left: 0.5em;
  color: var(--text-secondary, #888);
  user-select: none;
  text-align: right;
  width: 2em;
  font-size: 10px;
}
</style>
