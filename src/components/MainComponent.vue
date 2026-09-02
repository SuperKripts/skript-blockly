<script lang="ts" setup>
import CardComponent from '@/components/controls/CardComponent.vue'
import WorkspaceComponent from '@/components/blockly/WorkspaceComponent.vue'
import ButtonComponent from '@/components/controls/ButtonComponent.vue'
import EditTextComponent from '@/components/controls/EditTextComponent.vue'
import { useWorkspaceStore } from '@/stores/workspace'
const ws = useWorkspaceStore()
</script>

<template>
  <main class="main_content">
    <CardComponent class="workspace_card" :title="{ name: $t('WORKSPACE'), icon: 'fa-puzzle-piece' }">
      <template #titleText>
        <EditTextComponent :text="ws.workspaceName" :isSaved="ws.isSaved" @edit="(e) => (ws.workspaceName = e)" />
      </template>
      <template #titleAction>
        <ButtonComponent i="fa-trash-alt" @click="ws.workspace?.clear()">{{ $t('WORKSPACE_CLEAR') }}</ButtonComponent>
        <ButtonComponent i="fa-undo" @click="ws.workspace?.undo(false)">{{ $t('WORKSPACE_UNDO') }}</ButtonComponent>
        <ButtonComponent i="fa-redo" @click="ws.workspace?.undo(true)">{{ $t('WORKSPACE_REDO') }}</ButtonComponent>
      </template>
      <template #default>
        <WorkspaceComponent />
      </template>
    </CardComponent>
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

@media (max-width: 768px) {
  .workspace_card {
    margin: 8px;
  }

  .workspace_card :deep(.title_text) {
    display: none;
  }

  .workspace_card :deep(.card_actions .btn) {
    padding: 8px 10px;
  }

  .workspace_card :deep(.card_actions .btn-text) {
    display: none;
  }
}
</style>
