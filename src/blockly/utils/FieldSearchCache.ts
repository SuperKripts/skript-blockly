import * as Blockly from 'blockly/core'
import Fuse, { type FuseOptionKey } from 'fuse.js'
import { pinyin } from 'pinyin-pro'
import i18n from '@/locales/i18n'

export interface SearchOption {
  displayText: string
  value: string
  pinyinText: string
}

class SearchDropdownCache {
  private readonly cache = new Map<string, { options: SearchOption[]; fuse: Fuse<SearchOption>; language: string }>()

  getOrBuild(rawOptions: Blockly.MenuOption[], cacheKey?: string): { options: SearchOption[]; fuse: Fuse<SearchOption> } {
    const lang = this.getLanguage()
    const usePinyin = lang === 'zh_cn'

    if (cacheKey) {
      const entry = this.cache.get(cacheKey)
      if (entry?.language === lang) {
        return { options: entry.options, fuse: entry.fuse || [] }
      }
      const options = this.buildSearchOptions(rawOptions, usePinyin)
      const fuse = this.buildFuse(options, usePinyin)
      this.cache.set(cacheKey, { options, fuse, language: lang })
      return { options, fuse }
    } else {
      return { options: this.buildSearchOptions(rawOptions, usePinyin), fuse: this.buildFuse(this.buildSearchOptions(rawOptions, usePinyin), usePinyin) }
    }
  }

  private getLanguage(): string {
    return i18n.global.locale.value
  }

  private buildSearchOptions(rawOptions: Blockly.MenuOption[], enablePinyin: boolean): SearchOption[] {
    return rawOptions
      .filter((opt) => opt !== 'separator')
      .filter((opt) => typeof opt[0] === 'string')
      .map((opt) => {
        const [displayRaw, value] = opt
        const displayText = displayRaw as string
        let pinyinText = ''
        if (enablePinyin) {
          pinyinText = pinyin(displayText, { toneType: 'none', separator: '' })
        }
        return { displayText, value, pinyinText }
      })
  }

  private buildFuse(options: SearchOption[], enablePinyin: boolean): Fuse<SearchOption> {
    const keys: FuseOptionKey<SearchOption>[] = [
      { name: 'displayText', weight: 0.6 },
      { name: 'value', weight: 0.2 },
    ]
    if (enablePinyin && options.some((o) => o.pinyinText.length > 0)) {
      keys.push({ name: 'pinyinText', weight: 0.3 })
    }
    return new Fuse(options, {
      keys,
      threshold: 0.3,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true,
    })
  }
}

const searchCache = new SearchDropdownCache()
export default searchCache
