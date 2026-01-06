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
export const pt = (key: string, list: unknown[] = [], plural: number = 0): (string | number)[] => {
  const msg = t(key, list, plural)
  return msg
    .split(/%([1-9]\d*)/)
    .filter((segment) => segment !== '')
    .map((segment, index) => (index % 2 === 1 ? Number.parseInt(segment) : segment))
}
