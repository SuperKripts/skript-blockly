<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { useWorkspaceStore } from '@/stores/workspace';

const workspaceStore = useWorkspaceStore()
const themeStore = useThemeStore()
</script>

<template>
  <footer class="status-bar">
    <div class="status-items">
      <div class="status-item">
        <i class="fas fa-cube status-icon"></i>
        <span>
          <span class="status-text">{{ $t('BLOCKLY_COUNT') }}</span>
          <span>{{ workspaceStore.blockCount }}</span>
        </span>
      </div>
      <div class="status-item">
        <i class="fas fa-code status-icon"></i>
        <span>
          <span class="status-text">{{ $t('CODE_LINE') }}</span>
          <span>{{ workspaceStore.codeLine }}</span>
        </span>
      </div>
      <div class="status-item">
        <i class="fas fa-check-circle status-icon"></i>
        <span>
          <span class="status-text">{{ $t('WORKSPACE_STATE') }}</span>
          <span>{{ workspaceStore.state }}</span>
        </span>
      </div>
      <div class="status-item" v-if="!workspaceStore.isSaved">
        <i class="fas fa-exclamation-circle status-icon" style="color: #ff9800;"></i>
        <span>
          <span>{{ $t('WORKSPACE_UNSAVED') }}</span>
        </span>
      </div>
    </div>

    <div class="status-actions">
      <button class="status-btn" @click="themeStore.toggle">
        <i class="fas" :class="themeStore.isDark ? 'fa-sun' : 'fa-moon'"></i>
        <span class="btn-text">{{ themeStore.isDark ? $t('THEME_LIGHT') : $t('THEME_DARK') }}</span>
      </button>
      <button class="status-btn" id="toggleGrid" @click="workspaceStore.toggleGrid">
        <i class="fas fa-th"></i>
        <span class="btn-text">{{ workspaceStore.grid ? $t('GRID_HIDE') : $t('GRID_SHOW') }}</span>
      </button>
      <button class="status-btn" id="helpBtn">
        <i class="fas fa-question-circle"></i>
        <span class="btn-text">{{ $t('HELP') }}</span>
      </button>
      <a href="https://github.com/SuperKripts/superkripts.github.io/issues" target="_blank" rel="noopener noreferrer"
        class="status-btn" style="text-decoration: none; color: inherit;">
        <i class="fas fa-comment-dots"></i>
        <span class="btn-text">{{ $t('FEEDBACK') }}</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.status-bar {
  background-color: var(--bg-dark);
  color: white;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: var(--status-height);
}

.status-items {
  display: flex;
  gap: 24px;
  height: 100%;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
}

.status-icon {
  color: var(--accent-primary);
  font-size: 14px;
  width: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-text {
  opacity: 0.8;
}

.status-value {
  font-weight: 600;
}

.status-actions {
  display: flex;
  gap: 16px;
  height: 100%;
}

.status-btn {
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  opacity: 0.8;
  transition: var(--transition);
  padding: 0;
  height: 100%;
}

.status-btn:hover {
  opacity: 1;
}

.btn-text {
  line-height: 1;
}
</style>
