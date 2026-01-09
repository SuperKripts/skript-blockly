<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as Blockly from "blockly/core"
import { useWorkspaceStore } from "@/stores/workspace";
import { config } from "@/blockly/config";
const blocklyContent = ref()

onMounted(() => {
  const workspace = Blockly.inject(blocklyContent.value, config)
  workspace.addChangeListener(Blockly.Events.disableOrphans)
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
