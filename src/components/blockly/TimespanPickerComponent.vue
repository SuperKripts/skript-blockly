<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { t } from '@/locales/i18n'

const props = defineProps<{
  value: string
  showForever?: boolean
}>()

const emit = defineEmits<{
  (e: 'select', value: string): void
  (e: 'close'): void
}>()

const timeUnits = new Set([
  'millisecond',
  'tick',
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
])
const timeModes = new Set(['real', 'minecraft'])

const amount = ref('1')
const unit = ref('second')
const mode = ref('')
const isForever = ref(false)

function parseValue(value: string) {
  if (!value) return
  const trimmed = value.trim()
  if (trimmed === 'forever') {
    isForever.value = true
    unit.value = 'forever'
    amount.value = ''
    mode.value = ''
    return
  }

  isForever.value = false
  const parts = trimmed.split(/\s+/)

  if (parts[0] === 'a') {
    amount.value = '1'
    if (parts.length === 2) {
      unit.value = parts[1]
      mode.value = ''
    } else if (parts.length === 3) {
      mode.value = parts[1]
      unit.value = parts[2]
    }
    return
  }

  if (parts.length === 1) {
    const single = parts[0].toLowerCase()
    if (timeUnits.has(single)) {
      amount.value = '1'
      unit.value = single
      mode.value = ''
    }
  } else if (parts.length === 2) {
    if (!Number.isNaN(Number(parts[0]))) {
      amount.value = parts[0]
      unit.value = parts[1].toLowerCase()
      mode.value = ''
    } else if (timeModes.has(parts[0].toLowerCase())) {
      amount.value = '1'
      mode.value = parts[0].toLowerCase()
      unit.value = parts[1].toLowerCase()
    }
  } else if (parts.length === 3) {
    amount.value = parts[0]
    mode.value = parts[1].toLowerCase()
    unit.value = parts[2].toLowerCase()
  }
}

parseValue(props.value)

// 计算显示值：数量1显示"a"，>1显示数字，forever显示"forever"
const displayValue = computed(() => {
  if (isForever.value) return 'forever'
  const parts: string[] = []
  const num = Number.parseFloat(amount.value)
  if (!Number.isNaN(num) && amount.value !== '') {
    if (num === 1) {
      parts.push('a')
    } else {
      parts.push(amount.value)
    }
  } else if (amount.value === '') {
    return unit.value === 'forever' ? 'forever' : `a ${unit.value}`
  }
  if (mode.value) parts.push(mode.value)
  parts.push(unit.value)
  return parts.join(' ')
})

function updateValue() {
  emit('select', displayValue.value)
}

function onAmountChange(e: Event) {
  amount.value = (e.target as HTMLInputElement).value
  updateValue()
}

function onUnitChange(e: Event) {
  const newUnit = (e.target as HTMLSelectElement).value
  if (newUnit === 'forever') {
    isForever.value = true
    amount.value = ''
    mode.value = ''
    unit.value = 'forever'
  } else {
    isForever.value = false
    unit.value = newUnit
  }
  updateValue()
}

function onModeChange(e: Event) {
  mode.value = (e.target as HTMLSelectElement).value
  updateValue()
}

function onEnter() {
  updateValue()
  emit('close')
}

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  requestAnimationFrame(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
})
</script>

<template>
  <div class="timespan-picker">
    <div class="picker-controls">
      <input ref="inputRef" v-model="amount" type="number" class="amount-input"
        :placeholder="t('TYPE_TIMESPAN_AMOUNT_PLACEHOLDER')" @input="onAmountChange" @keydown.enter.prevent="onEnter"
        :disabled="isForever" />
      <select class="unit-select" :value="unit" @change="onUnitChange">
        <option v-for="u in timeUnits" :key="u" :value="u">
          {{ t('TYPE_TIME_' + u.toUpperCase()) }}
        </option>
        <option v-if="showForever" value="forever">
          {{ t('TYPE_TIME_FOREVER') }}
        </option>
      </select>
      <select class="mode-select" :value="mode" @change="onModeChange" :disabled="isForever">
        <option value="">{{ t('TYPE_TIMESPAN_MODE_ANY') }}</option>
        <option v-for="m in timeModes" :key="m" :value="m">
          {{ t('TYPE_TIME_' + m.toUpperCase()) }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.timespan-picker {
  padding: 8px 4px;
}

.picker-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.amount-input {
  width: 60px;
  text-align: center;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  font-size: 13px;
  padding: 4px 0;
  outline: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
  appearance: textfield;
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.amount-input::placeholder {
  color: inherit;
  opacity: 0.6;
}

.mode-select,
.unit-select {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  font-size: 13px;
  padding: 4px 16px 4px 0;
  outline: none;
  transition: border-color 0.2s ease;
  font-family: inherit;
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23ffffff' fill-opacity='0.8' d='M0 3l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
}

.mode-select option,
.unit-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.amount-input:focus,
.mode-select:focus,
.unit-select:focus {
  border-bottom-color: var(--accent-primary, #ff9800);
}

.amount-input:disabled,
.mode-select:disabled,
.unit-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-bottom-style: dashed;
}
</style>