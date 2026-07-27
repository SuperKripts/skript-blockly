<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import SearchDropdownComponent from './SearchDropdownComponent.vue'
import searchCache from '@/blockly/utils/FieldSearchCache'
import {
  getBlockParams,
  getBlockDisplayName,
  getParamDisplayName,
  getParamValueDisplay,
  type BlockDataState,
  type BlockDataParam,
} from '@/blockly/blocks/types/BlockDataParams'
import { t } from '@/locales/i18n'
import type { MenuOption } from 'blockly/core'

const props = withDefaults(defineProps<{
  state: BlockDataState
  options: MenuOption[]
  withEmpty?: boolean
}>(), {
  withEmpty: false
})

const emit = defineEmits<{
  (e: 'resize'): void
  (e: 'select', state: BlockDataState): void
  (e: 'close'): void
}>()

const CACHE_KEY = 'block_data_blocks'

const blockName = ref('')
const params = ref<Record<string, string>>({})

const { options: searchOptions, fuse: searchFuse } = searchCache.getOrBuild(props.options, CACHE_KEY)

const availableParams = computed<BlockDataParam[]>(() => {
  if (!blockName.value) return []
  return getBlockParams(blockName.value)
})

const currentState = computed<BlockDataState>(() => ({
  blockName: blockName.value,
  params: { ...params.value },
}))

function selectBlock(value: string) {
  blockName.value = value
  params.value = {}
  emit('select', currentState.value)
}

function anyBlock(isSearch: boolean) {
  blockName.value = ''
  params.value = {}
  emit('resize')
  const _ = isSearch ? emit('select', { blockName: '', params: {} }) : emit('resize')
}

function setParam(key: string, value: string) {
  if (!value) {
    delete params.value[key]
  } else {
    params.value[key] = value
  }
  emit('select', currentState.value)
}

function removeParam(key: string) {
  delete params.value[key]
  emit('select', currentState.value)
}

function getParamValue(key: string): string {
  return params.value[key] || ''
}

watch(() => props.state, (newState) => {
  blockName.value = newState.blockName || ''
  params.value = { ...newState.params }
}, { immediate: true })
</script>

<template>
  <div class="block-data-container">
    <div v-if="!blockName" class="search-section">
      <SearchDropdownComponent :options="searchOptions" :searcher="searchFuse" @select="selectBlock"
        @close="emit('close')" />
    </div>

    <div v-else class="selected-section">
      <div class="selected-block">
        <span class="block-name">{{ getBlockDisplayName(blockName) }}</span>
        <div class="button-group">
          <button v-if="withEmpty" class="reset-btn" type="button" @click="anyBlock(true)">
            {{ t('BLOCK_DATA_RESET') }}
          </button>
          <button class="change-btn" type="button" @click="anyBlock(false)">
            {{ t('BLOCK_DATA_CHANGE_BLOCK') }}
          </button>
        </div>
      </div>

      <div v-if="availableParams.length > 0" class="params-editor">
        <div v-for="param in availableParams" :key="param.key" class="param-row">
          <label for="param-select-{{ param.key }}" class="param-label">{{ getParamDisplayName(param.key) }}</label>
          <select id="param-select-{{ param.key }}" class="param-select" :value="getParamValue(param.key)"
            @change="setParam(param.key, ($event.target as HTMLSelectElement).value)">
            <option value="">{{ t('BLOCK_DATA_SELECT_VALUE') }}</option>
            <option v-for="val in param.values" :key="val" :value="val">
              {{ getParamValueDisplay(param.key, val) }}
            </option>
          </select>
          <button v-if="getParamValue(param.key)" class="param-remove" type="button"
            @click="removeParam(param.key)">×</button>
        </div>
      </div>

      <div v-else-if="Object.keys(params).length > 0" class="active-params">
        <div v-for="key in Object.keys(params)" :key="key" class="param-row">
          <span class="param-label">{{ getParamDisplayName(key) }}</span>
          <span class="param-value-display">{{ getParamValueDisplay(key, params[key]) }}</span>
          <button class="param-remove" type="button" @click="removeParam(key)">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block-data-container {
  width: 100%;
  min-width: 220px;
  max-width: 380px;
  padding: 8px 12px;
  border-radius: 6px;
  box-sizing: border-box;
}

.search-section,
.selected-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selected-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  gap: 8px;
}

.block-name {
  font-size: 14px;
  font-weight: 500;
  color: white;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.change-btn,
.reset-btn {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  appearance: none;
  -webkit-appearance: none;
}

.change-btn:hover {
  background: rgba(255, 255, 255, 0.28);
}

.reset-btn {
  background: rgba(100, 150, 255, 1);
  color: white;
}

.reset-btn:hover {
  background: rgba(100, 150, 255, 0.8);
}

.params-editor {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.param-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.param-label {
  min-width: 80px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  flex-shrink: 0;
}

.param-select {
  flex: 1;
  min-width: 0;
  padding: 5px 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  color: white;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}

.param-select:focus {
  border-color: rgba(255, 255, 255, 0.5);
}

.param-select option {
  background: #2a2a2a;
  color: white;
}

.param-value-display {
  flex: 1;
  font-size: 12px;
  color: rgba(100, 255, 150, 0.9);
}

.param-remove {
  width: 24px;
  height: 24px;
  padding: 0;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  line-height: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  -webkit-appearance: none;
  opacity: 1;
  pointer-events: auto;
}

.param-remove:hover {
  background: rgba(255, 100, 100, 0.4);
}

.active-params {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}
</style>
