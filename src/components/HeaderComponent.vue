<script setup lang="ts">
import TitleLogoComponent from '@/components/controls/TitleLogoComponent.vue'
import SelectComponent from '@/components/controls/SelectComponent.vue'
import ButtonComponent from '@/components/controls/ButtonComponent.vue'
import ContentMenuComponent from '@/components/controls/ContentMenuComponent.vue'
import CardComponent from '@/components/controls/CardComponent.vue'
import CodePreviewComponent from '@/components/controls/CodePreviewComponent.vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const selectWorkspace = ref<HTMLDialogElement>()
const generateCode = ref<HTMLDialogElement>()
const mobileMenu = ref<HTMLDivElement>()
const mobileMenuOpen = ref(false)
const ws = useWorkspaceStore()
const { t } = useI18n()

const saveMenu = ref<InstanceType<typeof ContentMenuComponent>>()
const loadMenu = ref<InstanceType<typeof ContentMenuComponent>>()
const genMenu = ref<InstanceType<typeof ContentMenuComponent>>()
const saveMenuInfo = [
  { key: 'saveToBrowser', label: t('WORKSPACE_SAVE_TO_BROWSER'), icon: 'fa-file-arrow-down', onClick: ws.saveWorkspaceToBrowser },
  { key: 'saveToFile', label: t('WORKSPACE_SAVE_TO_FILE'), icon: 'fa-floppy-disk', onClick: ws.saveWorkspaceToFile },
  { key: 'saveToClipboard', label: t('WORKSPACE_SAVE_TO_CLIPBOARD'), icon: 'fa-clipboard', onClick: ws.saveWorkspaceToClipboard },
  { key: 'saveToConsole', label: t('WORKSPACE_SAVE_TO_CONSOLE'), icon: 'fa-terminal', onClick: ws.saveWorkspaceToConsole },
]

const loadMenuInfo = [
  { key: 'loadFromBrowser', label: t('WORKSPACE_LOAD_FROM_BROWSER'), icon: 'fa-file-arrow-up', onClick: () => selectWorkspace.value?.showModal() },
  { key: 'loadFromFile', label: t('WORKSPACE_LOAD_FROM_FILE'), icon: 'fa-folder-open', onClick: ws.loadWorkspaceFromFile },
  { key: 'loadFromClipboard', label: t('WORKSPACE_LOAD_FROM_CLIPBOARD'), icon: 'fa-clipboard-check', onClick: ws.loadWorkspaceFromClipboard },
]

const genMenuInfo = [
  { key: 'genToFile', label: t('WORKSPACE_GENERATE_CODE_TO_FILE'), icon: 'fa-file-code', onClick: ws.generateCodeToFile },
  { key: 'genToClipboard', label: t('WORKSPACE_GENERATE_CODE_TO_CLIPBOARD'), icon: 'fa-clipboard', onClick: ws.generateCodeToClipboard },
  { key: 'genToConsole', label: t('WORKSPACE_GENERATE_CODE_TO_CONSOLE'), icon: 'fa-terminal', onClick: ws.generateCodeToConsole },
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

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <header class="header">
    <TitleLogoComponent />
    <div class="header-controls">
      <div class="toolbar desktop-toolbar">
        <SelectComponent :options="['中文', 'Chinese', '中国語', '한국어']" :flag="['🇨🇳', '🇺🇸', '🇯🇵', '🇰🇷']"
          i="fa-globe" />
        <ButtonComponent i="fa-save" @contextmenu.prevent="openSaveMenu" @click="ws.saveWorkspaceToBrowser">
          {{ $t('WORKSPACE_SAVE') }}
        </ButtonComponent>
        <ButtonComponent i="fa-folder-open" @contextmenu.prevent="openLoadMenu" @click="selectWorkspace?.showModal()">
          {{ $t('WORKSPACE_LOAD') }}
        </ButtonComponent>
        <ButtonComponent type="primary" i="fa-code" @contextmenu.prevent="openGenMenu"
          @click="generateCode?.showModal(); ws.generateCode()">
          {{ $t('WORKSPACE_GENERATE_CODE') }}
        </ButtonComponent>

        <ContentMenuComponent ref="saveMenu" :items="saveMenuInfo"></ContentMenuComponent>
        <ContentMenuComponent ref="loadMenu" :items="loadMenuInfo"></ContentMenuComponent>
        <ContentMenuComponent ref="genMenu" :items="genMenuInfo"></ContentMenuComponent>
      </div>
      <button class="hamburger" @click="toggleMobileMenu">
        <i class="fas" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- 移动端抽屉菜单 -->
    <Teleport to="body">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
      <div ref="mobileMenu" class="mobile-drawer" :class="{ open: mobileMenuOpen }">
        <div class="mobile-menu-header">
          <span>{{ $t('MENU') }}</span>
          <button class="close-btn" @click="closeMobileMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="mobile-menu-content">
          <div class="mobile-menu-section">
            <SelectComponent :options="['中文', 'Chinese', '中国語', '한국어']" :flag="['🇨🇳', '🇺🇸', '🇯🇵', '🇰🇷']"
              i="fa-globe" />
          </div>

          <div class="mobile-menu-section">
            <h4><i class="fas fa-puzzle-piece"></i> {{ $t('WORKSPACE') }}</h4>
            <ButtonComponent i="fa-plus" @click="!ws.newWorkspace() || closeMobileMenu()">
              {{ $t('WORKSPACE_NEW') }}
            </ButtonComponent>
            <ButtonComponent :i="ws.toolbox ? 'fa-chevron-left' : 'fa-chevron-right'"
              @click="ws.toggleToolbox(); closeMobileMenu()">
              {{ ws.toolbox ? $t('TOOLBOX_HIDE') : $t('TOOLBOX_SHOW') }}
            </ButtonComponent>
          </div>

          <div class="mobile-menu-section">
            <h4><i class="fas fa-file-arrow-down"></i> {{ $t('WORKSPACE_SAVE') }}</h4>
            <ButtonComponent i="fa-file-arrow-down" @click="ws.saveWorkspaceToBrowser(); closeMobileMenu()">
              {{ $t('WORKSPACE_SAVE_TO_BROWSER') }}
            </ButtonComponent>
            <ButtonComponent i="fa-floppy-disk" @click="ws.saveWorkspaceToFile(); closeMobileMenu()">
              {{ $t('WORKSPACE_SAVE_TO_FILE') }}
            </ButtonComponent>
            <ButtonComponent i="fa-clipboard" @click="ws.saveWorkspaceToClipboard(); closeMobileMenu()">
              {{ $t('WORKSPACE_SAVE_TO_CLIPBOARD') }}
            </ButtonComponent>
            <ButtonComponent i="fa-terminal" @click="ws.saveWorkspaceToConsole(); closeMobileMenu()">
              {{ $t('WORKSPACE_SAVE_TO_CONSOLE') }}
            </ButtonComponent>
          </div>

          <div class="mobile-menu-section">
            <h4><i class="fas fa-folder-open"></i> {{ $t('WORKSPACE_LOAD') }}</h4>
            <ButtonComponent i="fa-file-arrow-up" @click="selectWorkspace?.showModal(); closeMobileMenu()">
              {{ $t('WORKSPACE_LOAD_FROM_BROWSER') }}
            </ButtonComponent>
            <ButtonComponent i="fa-folder-open" @click="ws.loadWorkspaceFromFile(); closeMobileMenu()">
              {{ $t('WORKSPACE_LOAD_FROM_FILE') }}
            </ButtonComponent>
            <ButtonComponent i="fa-clipboard-check" @click="ws.loadWorkspaceFromClipboard(); closeMobileMenu()">
              {{ $t('WORKSPACE_LOAD_FROM_CLIPBOARD') }}
            </ButtonComponent>
          </div>

          <div class="mobile-menu-section">
            <h4><i class="fas fa-code"></i> {{ $t('WORKSPACE_GENERATE_CODE') }}</h4>
            <ButtonComponent type="primary" i="fa-code"
              @click="generateCode?.showModal(); ws.generateCode(); closeMobileMenu()">
              {{ $t('CODE_PREVIEW') }}
            </ButtonComponent>
            <ButtonComponent i="fa-file-code" @click="ws.generateCodeToFile(); closeMobileMenu()">
              {{ $t('WORKSPACE_GENERATE_CODE_TO_FILE') }}
            </ButtonComponent>
            <ButtonComponent i="fa-clipboard" @click="ws.generateCodeToClipboard(); closeMobileMenu()">
              {{ $t('WORKSPACE_GENERATE_CODE_TO_CLIPBOARD') }}
            </ButtonComponent>
            <ButtonComponent i="fa-terminal" @click="ws.generateCodeToConsole(); closeMobileMenu()">
              {{ $t('WORKSPACE_GENERATE_CODE_TO_CONSOLE') }}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Teleport>
    <dialog ref="selectWorkspace" class="select_workspace_dialog">
      <CardComponent class="workspace_card" :title="{ name: $t('WORKSPACE_SELECT'), icon: 'fa-layer-group' }">
        <template #titleAction>
          <ButtonComponent i="fa-times" @click="selectWorkspace?.close()">
            {{ $t('MODEL_CLOSE') }}
          </ButtonComponent>
          <ButtonComponent type="primary" i="fa-plus" @click="!ws.newWorkspace() || selectWorkspace?.close()">
            {{ $t('WORKSPACE_NEW') }}
          </ButtonComponent>
        </template>
        <template #default>
          <div class="workspace-list">
            <div v-for="(workspaceName, index) in ws.workspaceNames" :key="index" class="workspace-item"
              @click="ws.loadWorkspaceFromBrowser(workspaceName); selectWorkspace?.close()">
              <span class="workspace-name">{{ workspaceName }}</span>
              <ButtonComponent size="small" i="fa-trash-alt" @click.stop="ws.removeWorkspaceFromBrowser(workspaceName)">
                <!-- {{ $t('WORKSPACE_REMOVE') }} -->
              </ButtonComponent>
            </div>
          </div>
          <div v-if="ws.workspaceNames.length === 0" class="empty-tip">
            {{ $t('WORKSPACE_EMPTY') }}
          </div>
        </template>
      </CardComponent>
    </dialog>
    <dialog ref="generateCode" class="generate_code_dialog">
      <CardComponent :title="{ name: $t('CODE_PREVIEW'), icon: 'fa-code' }">
        <template #titleAction>
          <ButtonComponent i="fa-times" @click="generateCode?.close()">
            {{ $t('MODEL_CLOSE') }}
          </ButtonComponent>
          <ButtonComponent type="primary" i="fa-clipboard"
            @click="ws.copyCodeToClipboard() || selectWorkspace?.close()">
            {{ t('CODE_TO_CLIPBOARD') }}
          </ButtonComponent>
        </template>
        <template #default>
          <CodePreviewComponent />
        </template>
      </CardComponent>
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

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.hamburger:hover {
  background: var(--bg-primary);
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  animation: fadeIn 0.2s ease;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  max-width: 85vw;
  height: 100vh;
  background: var(--bg-secondary);
  z-index: 9999;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.mobile-drawer.open {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  font-size: 18px;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.close-btn:hover {
  background: var(--bg-primary);
}

.mobile-menu-content {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-menu-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-menu-section h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.mobile-menu-section h4 i {
  color: var(--accent-primary);
  width: 16px;
}

.mobile-menu-section .btn {
  width: 100%;
  justify-content: flex-start;
}

.btn-link {
  text-decoration: none;
}

@media (max-width: 768px) {
  .desktop-toolbar {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .header {
    padding: 0 16px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
