<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
const { options, defaultOption = 0, flag, i } = defineProps<{ options: string[], defaultOption?: number, flag: string[], i?: string }>()
const dropdown = ref(false)
const select = ref(defaultOption)
const dropdownRef = ref<Element>()

function handleClickOutside(event: MouseEvent) {
  if (dropdown.value && dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="selector" ref="dropdownRef">
    <div class="btn" :class="{ 'active': dropdown }" @click="dropdown = !dropdown">
      <i v-if="i" class="fas" :class="i"></i>
      <span>{{ options[select] }}</span>
    </div>

    <div class="dropdown" :class="{ 'show': dropdown }">
      <div class="option" :class="{ 'active': select == index }" v-for="(option, index) in options" :key="index"
        @click="select = index; dropdown = false">
        <span class="flag">{{ flag[index] }}</span>
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selector {
  position: relative;
  display: inline-block;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
}

.btn:hover,
.btn.active {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-sm);
}

.btn::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid var(--text-primary);
  transition: transform 0.3s;
}

.btn.active::after {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 160px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  z-index: 1000;

  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  visibility: hidden;
  transition: opacity 0.25s, transform 0.25s ease-out, visibility 0.25s;
}

.dropdown.show {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
}

.option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-primary);
}

.option:hover {
  background-color: var(--bg-primary);
}

.option.active {
  background-color: var(--accent-light);
  color: var(--accent-primary);
}

.flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>
