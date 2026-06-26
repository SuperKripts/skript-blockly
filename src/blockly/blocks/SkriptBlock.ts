import * as Blockly from 'blockly/core'
import { t } from '@/locales/i18n'

export type SkriptBlockExtraState = Record<string, unknown>

export const SupportedSyntaxTypes = ['event', 'condition', 'effect', 'expression', 'type', 'function', 'section', 'structure'] as const

export type SyntaxType = (typeof SupportedSyntaxTypes)[number]

export type Syntax = {
  key: string
  title: string
  syntaxType: SyntaxType
  docUrl: string
}

export type SkriptBlockDefinition = {
  init: (this: SkriptBlock) => void
  saveExtraState: (this: SkriptBlock) => SkriptBlockExtraState
  loadExtraState: (this: SkriptBlock, state: SkriptBlockExtraState) => void
  compose?: (this: SkriptBlock, topBlock: Blockly.Block) => void
  decompose?: (this: SkriptBlock, workspace: Blockly.Workspace) => Blockly.Block
  initStyle_: (this: SkriptBlock) => void
  initShape_: (this: SkriptBlock) => void
  updateShape_: (this: SkriptBlock) => void
  description_: (this: SkriptBlock) => string
  generateDescriptionLangKey_: (this: SkriptBlock) => string
  descriptionLangKey_?: string
}

export type SkriptBlock = Blockly.BlockSvg &
  SkriptBlockDefinition & {
    extra_: SkriptBlockExtraState
  }

export function getSkriptHubDocUrl(id?: number): string {
  return id ? 'https://skripthub.net/docs/' + id : 'https://skripthub.net/docs/?id=' + (id ?? 0)
}

export function createSkriptDefinition(syntax: Syntax): SkriptBlockDefinition {
  return {
    init(this: SkriptBlock) {
      this.extra_ = {}
      this.initShape_()
      this.initStyle_()
      this.setTooltip(syntax.title)
      this.setHelpUrl(syntax.docUrl)
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
      return (syntax.syntaxType + '_' + syntax.key + '_DESC').toUpperCase()
    },
    initShape_(this: SkriptBlock) {
      this.appendDummyInput().appendField(this.description_())
    },
    initStyle_(this: SkriptBlock) {
      this.setStyle(syntax.syntaxType)
      switch (syntax.syntaxType) {
        case 'event':
          this.appendStatementInput('block')
          break
        default:
          break
      }
    },
  }
}
