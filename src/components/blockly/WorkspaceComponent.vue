<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as Blockly from "blockly"
import useToolbox from "@/blockly/toolbox";
import { useWorkspaceStore } from "@/stores/workspace";
import * as SkriptHubTheme from "@/blockly/themes/skripthub";
const blocklyContent = ref()

onMounted(() => {
  Blockly.ContextMenuItems.registerCommentOptions()
  const workspace = Blockly.inject(blocklyContent.value, {
    // scrollbars: false,
    toolbox: useToolbox(),
    // theme,
    media: "/blockly/media",
    theme: SkriptHubTheme.skript,
    zoom: {
      controls: true,
      wheel: true
    },
    grid: {
      spacing: 20,
      length: 22,
      snap: false
    },
    trashcan: false,
    sounds: false,
    css: true,
    renderer: 'Thrasos',
  })
  workspace.addChangeListener(Blockly.Events.disableOrphans);
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
