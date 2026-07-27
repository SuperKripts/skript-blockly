import { createI18n } from 'vue-i18n'
import * as Blockly from 'blockly/core'
import { watch } from 'vue'

const i18n = createI18n({
  locale: 'zh_cn',
  legacy: false,
  messages: {
    zh_cn: await import('@/locales/zh_cn'),
    en_us: await import('@/locales/en_us'),
  },
})

Blockly.setLocale(i18n.global.messages.value[i18n.global.locale.value])
watch(i18n.global.locale, (locale) => {
  Blockly.setLocale(i18n.global.messages.value[locale])
})

export default i18n
export const { t, tm } = i18n.global
export const pt = (msg: string): (string | number)[] => {
  const match = t(msg).match(/%(\d+)|[^%]+|%/g)
  if (match) {
    return match.map((m) => (m.startsWith('%') && m.length > 1 ? Number(m.slice(1)) : m))
  }
  return []
}

type TemplateHandlers = {
  [index: number]: () => void
  default?: (i: { msg: string; index: number }) => void
}

export const pte = (msg: string, handlers: TemplateHandlers) => {
  const parts = pt(msg)
  parts.forEach((v, i) => {
    if (typeof v === 'string') {
      handlers.default?.({ msg: v, index: i })
    } else {
      handlers[v]?.()
    }
  })
}
