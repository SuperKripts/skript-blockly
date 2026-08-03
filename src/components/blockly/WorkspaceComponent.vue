<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { injectBlockly } from '@/blockly/config'
const blocklyContent = ref()

onMounted(() => {
  const workspace = injectBlockly(blocklyContent.value)
  useWorkspaceStore().setWorkspace(workspace)
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
