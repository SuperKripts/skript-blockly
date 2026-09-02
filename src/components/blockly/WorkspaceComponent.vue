<script setup lang="ts">
import * as Blockly from 'blockly'
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useWorkspaceStore } from '@/stores/workspace'
import { useViewportStore } from '@/stores/viewport'
import { injectBlockly } from '@/blockly/config'

const blocklyContent = ref()
const workspaceStore = useWorkspaceStore()
const { isMobile } = storeToRefs(useViewportStore())

watch(isMobile, (newIsMobile) => {
  const workspace = workspaceStore.getWorkspace()
  const content = Blockly.serialization.workspaces.save(workspace)
  workspace.dispose()
  const newWorkspace = injectBlockly(blocklyContent.value, { horizontalLayout: newIsMobile })
  Blockly.serialization.workspaces.load(content, newWorkspace)
  workspaceStore.updateWorkspace(newWorkspace)
})

onMounted(() => {
  const workspace = injectBlockly(blocklyContent.value, { horizontalLayout: isMobile.value })
  workspaceStore.setWorkspace(workspace)
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
