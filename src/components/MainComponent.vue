<script lang="ts" setup>
import CardComponet from "@/components/controls/CardComponet.vue";
import WorkspaceComponent from "@/components/blockly/WorkspaceComponent.vue";
import ButtonComponet from "@/components/controls/ButtonComponet.vue";
import EditTextComponet from "@/components/controls/EditTextComponet.vue";
import { useWorkspaceStore } from "@/stores/workspace";
const ws = useWorkspaceStore()
</script>

<template>
  <main class="main_content">
    <CardComponet class="workspace_card" :title="{ name: $t('WORKSPACE'), icon: 'fa-puzzle-piece' }">
      <template #titleText>
        <EditTextComponet :text="ws.workspaceName" :isSaved="ws.isSaved" @edit="e => ws.workspaceName = e" />
      </template>
      <template #titleAction>
        <ButtonComponet i="fa-trash-alt" @click="ws.workspace?.clear()">{{ $t('WORKSPACE_CLEAR') }}</ButtonComponet>
        <ButtonComponet i="fa-undo" @click="ws.workspace?.undo(false)">{{ $t('WORKSPACE_UNDO') }}</ButtonComponet>
        <ButtonComponet i="fa-redo" @click="ws.workspace?.undo(true)">{{ $t('WORKSPACE_REDO') }}</ButtonComponet>
      </template>
      <template #default>
        <WorkspaceComponent />
      </template>
    </CardComponet>
  </main>
</template>

<style scoped>
.main_content {
  display: flex;
}

.workspace_card {
  margin: 20px;
  flex: 1;
  overflow: hidden;
}
</style>
