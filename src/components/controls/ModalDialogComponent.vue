<script lang="ts" setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDialogStore } from '@/stores/dialog'
import CardComponent from './CardComponent.vue'
import ButtonComponent from './ButtonComponent.vue'

const dialogStore = useDialogStore()
const { t } = useI18n()
const dialogRef = ref<HTMLDialogElement | null>(null)

const isPrompt = computed(() => dialogStore.kind === 'prompt')
const isConfirm = computed(() => dialogStore.kind === 'confirm')
const isAlert = computed(() => dialogStore.kind === 'alert')

const headerIcon = computed(() => {
  if (isAlert.value) return 'fa-circle-info'
  if (isConfirm.value) return 'fa-circle-question'
  if (isPrompt.value) return 'fa-keyboard'
  return 'fa-circle-info'
})

const headerTitle = computed(() => {
  if (isAlert.value) return t('DIALOG_TITLE_ALERT')
  if (isConfirm.value) return t('DIALOG_TITLE_CONFIRM')
  if (isPrompt.value) return t('DIALOG_TITLE_PROMPT')
  return ''
})

const titleIcon = computed(() => ({
  name: headerTitle.value,
  icon: headerIcon.value,
}))

const okText = computed(() => t('DIALOG_BTN_OK'))
const cancelText = computed(() => t('DIALOG_BTN_CANCEL'))

const onBackdropClick = (e: MouseEvent) => {
  if (e.target === dialogRef.value) {
    dialogStore.cancel()
  }
}

const onCancelEvent = (e: Event) => {
  e.preventDefault()
  dialogStore.cancel()
}

watch(
  () => dialogStore.visible,
  (v) => {
    const el = dialogRef.value
    if (!el) return
    if (v) {
      if (!el.open) {
        el.showModal()
      }
      if (isPrompt.value) {
        setTimeout(() => {
          const input = el.querySelector<HTMLInputElement>('input.dialog_prompt_input')
          input?.focus()
          input?.select()
        }, 10)
      }
    } else if (el.open) {
      el.close()
    }
  },
)

onBeforeUnmount(() => {
  const el = dialogRef.value
  if (el?.open) {
    el.close()
  }
})
</script>

<template>
  <dialog ref="dialogRef" class="dialog" @click="onBackdropClick" @cancel="onCancelEvent">
    <CardComponent class="dialog_card" :title="titleIcon">
      <div class="dialog_message">{{ dialogStore.message }}</div>

      <div v-if="isPrompt" class="dialog_prompt">
        <input class="dialog_prompt_input" type="text" v-model="dialogStore.inputValue"
          @keydown.enter.prevent="dialogStore.ok" aria-label="dialog input" />
      </div>

      <template #footer>
        <ButtonComponent v-if="!isAlert" type="secondary" @click="dialogStore.cancel">{{ cancelText }}</ButtonComponent>
        <ButtonComponent type="primary" @click="dialogStore.ok">{{ okText }}</ButtonComponent>
      </template>
    </CardComponent>
  </dialog>
</template>

<style scoped>
.dialog {
  border: none;
  background: transparent;
  padding: 0;
  margin: auto;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
}

.dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

.dialog_card {
  width: 440px;
  box-shadow: var(--shadow-lg);
  animation: dialogIn 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dialogIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dialog_message {
  padding: 20px;
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.dialog_prompt {
  padding: 0 20px 8px;
}

.dialog_prompt_input {
  width: 100%;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 120ms, box-shadow 120ms;
  box-sizing: border-box;
}

.dialog_prompt_input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-primary) 20%, transparent);
}
</style>
