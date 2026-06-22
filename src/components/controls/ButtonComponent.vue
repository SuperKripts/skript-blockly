<script lang="ts" setup>
const { type = 'secondary', i } = defineProps<{ type?: 'secondary' | 'primary', i?: string }>()
</script>

<template>
  <button class="btn" :class="'btn-' + type" @contextmenu="($attrs.onContextmenu as unknown)">
    <i v-if="i" class="fas" :class="i"></i>
    <span class="btn-text" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 14px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  outline: none;
  border: none;
  text-decoration: none;
  user-select: none;
}

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  background-color: var(--bg-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
</style>
