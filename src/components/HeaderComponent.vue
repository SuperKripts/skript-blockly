<script setup lang="ts">
import TitleLogoComponet from "@/components/controls/TitleLogoComponet.vue";
import SelectComponet from "@/components/controls/SelectComponet.vue";
import ButtonComponet from "@/components/controls/ButtonComponet.vue";
import ContentMenuComponet from "@/components/controls/ContentMenuComponet.vue";
import CardComponet from "@/components/controls/CardComponet.vue";
import { useWorkspaceStore } from "@/stores/workspace";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import highlight from "@/skript/highlight";
import { useThemeStore } from "@/stores/theme";

const selectWorkspace = ref<HTMLDialogElement>()
const generateCode = ref<HTMLDialogElement>()
const ws = useWorkspaceStore()
const ts = useThemeStore()
const { t } = useI18n()

const saveMenu = ref<InstanceType<typeof ContentMenuComponet>>()
const loadMenu = ref<InstanceType<typeof ContentMenuComponet>>()
const genMenu = ref<InstanceType<typeof ContentMenuComponet>>()
const saveMenuInfo = [
  { key: 'saveToBrowser', label: t('WORKSPACE_SAVE_TO_BROWSER'), icon: 'fa-file-arrow-down', onClick: ws.saveWorkspaceToBrowser },
  { key: 'saveToFile', label: t('WORKSPACE_SAVE_TO_FILE'), icon: 'fa-floppy-disk', onClick: ws.saveWorkspaceToFile },
  { key: 'saveToClipboard', label: t('WORKSPACE_SAVE_TO_CLIPBOARD'), icon: 'fa-clipboard', onClick: ws.saveWorkspaceToClipboard },
  { key: 'saveToConsole', label: t('WORKSPACE_SAVE_TO_CONSOLE'), icon: 'fa-terminal', onClick: ws.saveWorkspaceToConsole }
]

const loadMenuInfo = [
  { key: 'loadFromBrowser', label: t('WORKSPACE_LOAD_FROM_BROWSER'), icon: 'fa-file-arrow-up', onClick: () => selectWorkspace.value?.showModal() },
  { key: 'loadFromFile', label: t('WORKSPACE_LOAD_FROM_FILE'), icon: 'fa-folder-open', onClick: ws.loadWorkspaceFromFile },
  { key: 'loadFromClipboard', label: t('WORKSPACE_LOAD_FROM_CLIPBOARD'), icon: 'fa-clipboard-check', onClick: ws.loadWorkspaceFromClipboard }
]

const genMenuInfo = [
  { key: 'genToFile', label: t('WORKSPACE_GENERATE_CODE_TO_FILE'), icon: 'fa-file-code', onClick: ws.generateCodeToFile },
  { key: 'genToClipboard', label: t('WORKSPACE_GENERATE_CODE_TO_CLIPBOARD'), icon: 'fa-clipboard', onClick: ws.generateCodeToClipboard },
  { key: 'genToConsole', label: t('WORKSPACE_GENERATE_CODE_TO_CONSOLE'), icon: 'fa-terminal', onClick: ws.generateCodeToConsole }
]
function openSaveMenu(event: MouseEvent) {
  saveMenu.value?.open(event)
}
function openLoadMenu(event: MouseEvent) {
  loadMenu.value?.open(event)
}
function openGenMenu(event: MouseEvent) {
  genMenu.value?.open(event)
}
</script>

<template>
  <header class="header">
    <TitleLogoComponet />
    <div class="header-controls">
      <div class="toolbar">
        <SelectComponet :options="['中文', 'Chinese', '中国語', '중국어']" :flag="['🇨🇳', '🇺🇸', '🇯🇵', '🇰🇷']"
          i="fa-globe" />
        <ButtonComponet i="fa-save" @contextmenu.prevent="openSaveMenu" @click="ws.saveWorkspaceToBrowser">
          {{ $t('WORKSPACE_SAVE') }}
        </ButtonComponet>
        <ButtonComponet i="fa-folder-open" @contextmenu.prevent="openLoadMenu" @click="selectWorkspace?.showModal()">
          {{ $t('WORKSPACE_LOAD') }}
        </ButtonComponet>
        <ButtonComponet type="primary" i="fa-code" @contextmenu.prevent="openGenMenu"
          @click="generateCode?.showModal(); ws.generateCode()">
          {{ $t('WORKSPACE_GENERATE_CODE') }}
        </ButtonComponet>

        <ContentMenuComponet ref="saveMenu" :items="saveMenuInfo"></ContentMenuComponet>
        <ContentMenuComponet ref="loadMenu" :items="loadMenuInfo"></ContentMenuComponet>
        <ContentMenuComponet ref="genMenu" :items="genMenuInfo"></ContentMenuComponet>
      </div>
    </div>
    <dialog ref="selectWorkspace" class="select_workspace_dialog">
      <CardComponet class="workspace_card" :title="{ name: $t('WORKSPACE_SELECT'), icon: 'fa-layer-group' }">
        <template #titleAction>
          <ButtonComponet i="fa-times" @click="selectWorkspace?.close()">
            {{ $t('MODEL_CLOSE') }}
          </ButtonComponet>
          <ButtonComponet type="primary" i="fa-plus" @click="!ws.newWorkspace() || selectWorkspace?.close()">
            {{ $t('WORKSPACE_NEW') }}
          </ButtonComponet>
        </template>
        <template #default>
          <div class="workspace-list">
            <div v-for="(workspaceName, index) in ws.workspaceNames" :key="index" class="workspace-item"
              @click="ws.loadWorkspaceFromBrowser(workspaceName); selectWorkspace?.close()">
              <span class="workspace-name">{{ workspaceName }}</span>
              <ButtonComponet size="small" i="fa-trash-alt" @click.stop="ws.removeWorkspaceFromBrowser(workspaceName)">
                <!-- {{ $t('WORKSPACE_REMOVE') }} -->
              </ButtonComponet>
            </div>
          </div>
          <div v-if="ws.workspaceNames.length === 0" class="empty-tip">
            {{ $t('WORKSPACE_EMPTY') }}
          </div>
        </template>
      </CardComponet>
    </dialog>
    <dialog ref="generateCode" class="generate_code_dialog">
      <CardComponet :title="{ name: $t('CODE_PREVIEW'), icon: 'fa-code' }">
        <template #titleAction>
          <ButtonComponet i="fa-times" @click="generateCode?.close()">
            {{ $t('MODEL_CLOSE') }}
          </ButtonComponet>
          <ButtonComponet type="primary" i="fa-clipboard" @click="ws.copyCodeToClipboard() || selectWorkspace?.close()">
            {{ t('CODE_TO_CLIPBOARD') }}
          </ButtonComponet>
        </template>
        <template #default>
          <div class="code_view"
            v-html="highlight.codeToHtml(ws.code, { lang: 'Skript', theme: ts.isDark ? 'github-dark-default' : 'github-light-default' })">
          </div>
        </template>
      </CardComponet>
    </dialog>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--bg-secondary);
  padding: 0 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  z-index: 100;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.toolbar {
  display: flex;
  gap: 12px;
}

dialog {
  border: none;
  background: transparent;
  max-width: 100%;
  max-height: 100%;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

dialog[open] {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.generate_code_dialog :deep(.card) {
  width: 70%;
}

.code_view {
  height: 80vh;
}

.select_workspace_dialog :deep(.card) {
  width: 500px;
}

.workspace-list {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  padding: 0;
}

.workspace-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  transition: var(--transition);
}

.workspace-item:hover {
  background: var(--bg-primary);
}

.workspace-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: var(--text-primary);
}

.empty-tip {
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
  padding: 16px 0;
}
</style>
