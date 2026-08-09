import { defineStore } from 'pinia'
import { ref } from 'vue'

export type DialogKind = 'alert' | 'confirm' | 'prompt'

type PendingDialog = {
  kind: DialogKind
  message: string
  defaultText?: string
  resolve: (value: string | boolean | null) => void
}

export const useDialogStore = defineStore('dialog', () => {
  const visible = ref(false)
  const kind = ref<DialogKind>('alert')
  const message = ref('')
  const defaultText = ref('')
  const inputValue = ref('')

  let current: PendingDialog | null = null

  const reset = () => {
    visible.value = false
    kind.value = 'alert'
    message.value = ''
    defaultText.value = ''
    inputValue.value = ''
  }

  const open = (dialog: PendingDialog) => {
    kind.value = dialog.kind
    message.value = dialog.message
    defaultText.value = dialog.defaultText ?? ''
    inputValue.value = dialog.defaultText ?? ''
    visible.value = true
    current = dialog
  }

  // 确认：prompt 返回输入值，confirm 返回 true，alert 返回 true（被忽略）
  const ok = () => {
    const pending = current
    current = null
    const val = pending?.kind === 'prompt' ? inputValue.value : true
    reset()
    pending?.resolve(val)
  }

  // 取消：confirm 返回 false，prompt 返回 null，alert 返回 null（被忽略）
  const cancel = () => {
    const pending = current
    current = null
    const val = pending?.kind === 'confirm' ? false : null
    reset()
    pending?.resolve(val)
  }

  const $alert = (msg: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      open({ kind: 'alert', message: msg, resolve: () => resolve() })
    })
  }

  const $confirm = (msg: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      open({ kind: 'confirm', message: msg, resolve: (v) => resolve(v === true) })
    })
  }

  const $prompt = (msg: string, defaultValue = ''): Promise<string | null> => {
    return new Promise<string | null>((resolve) => {
      open({
        kind: 'prompt',
        message: msg,
        defaultText: defaultValue,
        resolve: (v) => resolve(v === null ? null : String(v)),
      })
    })
  }

  return {
    visible,
    kind,
    message,
    defaultText,
    inputValue,
    ok,
    cancel,
    $alert,
    $confirm,
    $prompt,
  }
})
