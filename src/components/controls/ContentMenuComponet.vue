<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface MenuItem {
  key: string
  label: string
  icon?: string
  disabled?: boolean
  onClick?: () => void
}

const props = defineProps<{
  items: MenuItem[]
}>()

const visible = ref(false)
const x = ref(0)
const y = ref(0)
const menuRef = ref<HTMLElement>()

const open = (event: MouseEvent) => {
  event.preventDefault()
  const { clientX, clientY } = event

  x.value = clientX
  y.value = clientY
  visible.value = true

  nextTick(() => {
    if (menuRef.value) {
      const rect = menuRef.value.getBoundingClientRect()
      const maxX = window.innerWidth - rect.width
      const maxY = window.innerHeight - rect.height
      x.value = Math.min(clientX, maxX)
      y.value = Math.min(clientY, maxY)
    }
  })
}

const close = () => {
  visible.value = false
}

const handleClick = (item: MenuItem) => {
  if (item.disabled) return
  item.onClick?.()
  close()
}

const handleOutsideClick = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => {
  globalThis.addEventListener('mousedown', handleOutsideClick)
})

onUnmounted(() => {
  globalThis.removeEventListener('mousedown', handleOutsideClick)
})

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" ref="menuRef" class="context-menu" :style="{ top: y + 'px', left: x + 'px' }" @click.stop>
      <div v-for="item in props.items" :key="item.key" class="context-menu-item" :class="{ disabled: item.disabled }"
        @click="handleClick(item)">
        <i v-if="item.icon" class="fas" :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.context-menu {
  position: fixed;
  z-index: 9999;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 6px 0;
  min-width: 160px;
  user-select: none;
  font-size: 14px;
  color: var(--text-primary);
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  white-space: nowrap;
  color: var(--text-primary);
}

.context-menu-item:hover:not(.disabled) {
  background: var(--bg-primary);
}

.context-menu-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  color: var(--text-light);
}

.context-menu-item i {
  width: 16px;
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
