import * as Blockly from 'blockly/core'
import type { Syntax } from '@/skript/SyntaxRegistry'
import { t } from '@/locales/i18n'

export type SkriptBlockExtraState = Record<string, unknown>

export type SkriptBlockDefinition = {
  init: (this: SkriptBlock) => void
  saveExtraState: (this: SkriptBlock) => SkriptBlockExtraState
  loadExtraState: (this: SkriptBlock, state: SkriptBlockExtraState) => void
  initStyle_: (this: SkriptBlock) => void
  initShape_: (this: SkriptBlock) => void
  updateShape_: (this: SkriptBlock) => void
  description_: (this: SkriptBlock) => string
  generateDescriptionLangKey_: (this: SkriptBlock) => string
  generateToCode_: (this: SkriptBlock) => string
  descriptionLangKey_?: string
}

export type SkriptBlock = Blockly.BlockSvg &
  SkriptBlockDefinition & {
    extra_: SkriptBlockExtraState
  }

export function createSkriptDefinition(syntax: Syntax): SkriptBlockDefinition {
  return {
    init(this: SkriptBlock) {
      this.initShape_()
      this.initStyle_()
      this.setTooltip(syntax.title)
      this.setHelpUrl('https://skripthub.net/docs/?id=' + syntax.id)
      this.updateShape_()
    },
    updateShape_: () => {},
    loadExtraState(state) {
      this.extra_ = state
      this.updateShape_()
    },
    saveExtraState() {
      return this.extra_
    },
    description_(this: SkriptBlock) {
      if (!this.descriptionLangKey_) {
        this.descriptionLangKey_ = this.generateDescriptionLangKey_()
      }
      return t(this.descriptionLangKey_)
    },
    generateDescriptionLangKey_() {
      return (syntax.syntaxType + '_' + syntax.jsonId + '_DESC').toUpperCase()
    },
    initShape_(this: SkriptBlock) {
      this.appendDummyInput().appendField(this.description_())
    },
    initStyle_(this: SkriptBlock) {
      this.setStyle('skript')
    },
    generateToCode_() {
      throw new Error('Method not implemented.')
    },
  }
}
