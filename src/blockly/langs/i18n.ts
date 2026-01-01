import { Msg } from 'blockly/core'

// import { defaultMsg, extendLang } from '@/blockly/langs/zh-cn'

// setLocale(defaultMsg)
// setLocale(extendLang)

const s = /%([1-9]\d*)/g

export default class I18n {
  static getLang(key?: string, ...placeholders: string[]): string {
    const text = key ? (Msg[key] ?? key) : ''
    if (placeholders.length === 0) {
      return text
    }
    return text.replace(s, (match: string, p1: string): string => {
      const index = Number(p1) - 1
      if (index >= 0 && index < placeholders.length) {
        return placeholders[index]!
      }
      return match
    })
  }

  static getLangSplit(key?: string, ...placeholders: string[]): string[] {
    const text = key ? (Msg[key] ?? key) : ''
    if (placeholders.length === 0) {
      return [text]
    }
    return text.split(/%([1-9])/g)
  }
}
