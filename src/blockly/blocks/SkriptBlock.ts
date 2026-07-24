import * as Blockly from 'blockly/core'

export type SkriptBlockExtraState = Record<string, unknown>

export const SupportedSyntaxTypes = ['event', 'condition', 'effect', 'expression', 'type', 'function', 'section', 'structure'] as const

export type SyntaxType = (typeof SupportedSyntaxTypes)[number]

export type Syntax = {
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
      this.setStyle(syntax.syntaxType)
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
    initShape_(this: SkriptBlock) {},
    initStyle_(this: SkriptBlock) {
      switch (syntax.syntaxType) {
        case 'event':
          this.appendStatementInput('block')
          break
        case 'effect':
          this.setPreviousStatement(true, null)
          this.setNextStatement(true, null)
          break
        default:
          break
      }
    },
  }
}
