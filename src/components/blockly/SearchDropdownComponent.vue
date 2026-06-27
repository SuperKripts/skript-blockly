<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type Fuse from 'fuse.js'
import { t } from '@/locales/i18n'
import { type SearchOption } from '@/blockly/utils/FieldSearchCache'

const props = defineProps<{
  options: SearchOption[]
  searcher: Fuse<SearchOption>
  currentValue?: string
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
  (e: 'close'): void
}>()

const searchQuery = ref('')
const highlightedIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLDivElement | null>(null)

const maxVisible = 500
const totalCount = computed(() => props.options.length)

const displayedOptions = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) {
    return props.options.slice(0, maxVisible)
  }
  const results = props.searcher.search(query, { limit: maxVisible })
  return results.map(r => r.item)
})

const moreText = computed(() => {
  const shown = displayedOptions.value.length
  const total = totalCount.value
  return `Showing ${shown} of ${total}`
})

function highlightIndex(index: number) {
  highlightedIndex.value = index
}

function clearHighlight() {
  highlightedIndex.value = -1
}

function selectOption(value: string) {
  emit('select', value)
}

function scrollToHighlighted() {
  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.list-item')
  if (highlightedIndex.value >= 0 && highlightedIndex.value < items.length) {
    items[highlightedIndex.value].scrollIntoView({ block: 'nearest' })
  }
}

function onInput() {
  clearHighlight()
}

function handleInputKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown': {
      e.preventDefault()
      if (displayedOptions.value.length === 0) return
      const next = Math.min(highlightedIndex.value + 1, displayedOptions.value.length - 1)
      highlightIndex(next)
      scrollToHighlighted()
      break
    }
    case 'ArrowUp': {
      e.preventDefault()
      const prev = highlightedIndex.value - 1
      if (prev < 0) {
        clearHighlight()
        inputRef.value?.focus()
      } else {
        highlightIndex(prev)
        scrollToHighlighted()
      }
      break
    }
    case 'Enter': {
      e.preventDefault()
      if (highlightedIndex.value >= 0) {
        const selected = displayedOptions.value[highlightedIndex.value]
        if (selected) selectOption(selected.value)
      } else {
        const first = displayedOptions.value[0]
        if (first) selectOption(first.value)
      }
      break
    }
    case 'Escape': {
      e.preventDefault()
      emit('close')
      break
    }
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    inputRef.value?.focus()
  })
})
</script>

<template>
  <div class="search-dropdown-container">
    <input ref="inputRef" v-model="searchQuery" type="search" class="search-input" :placeholder="t('BLOCKLY_SEARCH')"
      @input="onInput" @keydown="handleInputKeydown" />
    <div class="list-container" ref="listRef">
      <button v-for="(opt, index) in displayedOptions" :key="opt.value" class="list-item"
        :class="{ highlighted: highlightedIndex === index }" :data-value="opt.value" @click="selectOption(opt.value)"
        @pointerenter="highlightIndex(index)">
        {{ opt.displayText }}
      </button>
      <div v-if="totalCount > maxVisible" class="more-info">
        {{ moreText }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-dropdown-container {
  width: 100%;
  min-width: 180px;
  padding: 2px;
  border-radius: 6px;
  box-sizing: border-box;
}

.search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 6px 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 13px;
  outline: none !important;
  box-shadow: none !important;
  margin-bottom: 6px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
  outline: none !important;
}

.list-container {
  max-height: 260px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.list-item {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background: none;
  color: white;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none !important;
}

.list-item:hover,
.list-item.highlighted {
  background-color: rgba(255, 255, 255, 0.2);
}

.list-item:focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  outline: none !important;
}

.more-info {
  padding: 3px 10px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  margin-bottom: 4px;
}

.list-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.list-container::-webkit-scrollbar-track {
  background: transparent;
}

.list-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.list-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
