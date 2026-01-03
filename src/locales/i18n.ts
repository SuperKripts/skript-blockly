import { createI18n } from 'vue-i18n'
import * as Blockly from 'blockly/core'
import { watch } from 'vue'

const i18n = createI18n({
  locale: 'zh_cn',
  messages: {
    zh_cn: await import('@/locales/zh_cn'),
  },
})

Blockly.setLocale(i18n.global.messages[i18n.global.locale])

watch(
  () => i18n.global.locale,
  (locale) => Blockly.setLocale(i18n.global.messages[locale]),
)

export default i18n
export const { t } = i18n.global
