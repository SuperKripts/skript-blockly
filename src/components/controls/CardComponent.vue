<script lang="ts" setup>
const props = defineProps<{
  title?: {
    name: string
    icon?: string
  }
}>()
</script>

<template>
  <div class="card">
    <div v-if="$slots.header" class="card_header">
      <slot name="header"></slot>
    </div>
    <div v-else-if="props.title" class="card_header">
      <div class="card_title">
        <i v-if="props.title.icon" class="card_icon fas" :class="props.title.icon"></i>
        <h3 class="title_text">{{ props.title.name }}</h3>
        <slot class="title_text_card" name="titleText"></slot>
      </div>
      <div v-if="$slots.titleAction" class="card_actions">
        <slot name="titleAction"></slot>
      </div>
    </div>

    <div class="card_body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="card_footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: transparent;
  border-bottom: 1px solid var(--border-color);
  min-height: 52px;
}

.card_title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  min-width: 0;
  white-space: nowrap;
}

.card_icon {
  color: var(--accent-primary);
  font-size: 1.1rem;
  flex-shrink: 0;
  line-height: 1;
}

.title_text {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card_actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.card_body {
  flex: 1;
  overflow-y: auto;
}

.card_footer {
  padding: 14px 18px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
