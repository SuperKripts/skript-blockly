<script setup lang="ts">
import * as Blockly from 'blockly'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { injectBlockly } from '@/blockly/config'
const blocklyContent = ref()

const mediaQuery = window.matchMedia('(max-width: 768px)');
const isMobile = ref(mediaQuery.matches)
function handleChange(this: MediaQueryList) {
  isMobile.value = this.matches;
}

watch(isMobile, (newIsMobile) => {
  const workspace = useWorkspaceStore().getWorkspace()
  const content = Blockly.serialization.workspaces.save(workspace)
  workspace.dispose()
  const newWorkspace = injectBlockly(blocklyContent.value, { horizontalLayout: newIsMobile })
  Blockly.serialization.workspaces.load(content, newWorkspace)
  useWorkspaceStore().updateWorkspace(newWorkspace)
})

onMounted(() => {
  mediaQuery.addEventListener('change', handleChange);
  const workspace = injectBlockly(blocklyContent.value, { horizontalLayout: isMobile.value })
  useWorkspaceStore().setWorkspace(workspace)
})

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleChange);
})
</script>

<template>
  <div class="blockly_content" ref="blocklyContent"></div>
</template>

<style scoped>
.blockly_content {
  height: 100%;
  width: 100%;
}
</style>
