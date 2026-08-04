import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'

export type EventSyntax = {
  title: string
  docId: number
  eventValues?: string[]
  cancellable?: boolean
}

export type SimpleEventOptions = EventSyntax & {
  blockKey: string
  desc: string
  code: string
}

export type EasyEventOptions = EventSyntax & {
  blockKey: string
  desc: string | ((input: Blockly.Input) => void)
  code: string | ((block: SkriptEventBlock, generate: SkriptCodeGenerator) => [string, number] | string | null)
}

export type SkriptEventBlock = SkriptBlock & {
  cancellable_: boolean
  eventValues_: string[]
}

export function isSkriptEventBlock(block?: Blockly.Block | null): block is SkriptEventBlock {
  return block?.getStyleName() === 'event'
}

export function createSkriptEventDefinition(syntax: EventSyntax): SkriptBlockDefinition {
  const { title, docId, eventValues = [], cancellable = false } = syntax
  const definition = createSkriptDefinition({ title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(docId) })
  const mixin: Partial<SkriptEventBlock> = {
    cancellable_: cancellable,
    eventValues_: eventValues,
    initStyle_() {
      this.setPreviousStatement(true, 'event')
      this.appendStatementInput('block')
    },
  }
  return Object.assign(definition, mixin)
}

export function registerEasyEvent(option: EasyEventOptions): Blockly.utils.toolbox.BlockInfo {
  const { blockKey, desc } = option
  const definition = createSkriptEventDefinition(option)
  const mixin: Partial<SkriptEventBlock> = {
    initShape_(this: SkriptBlock) {
      const descInput = this.appendDummyInput()
      if (typeof desc === 'string') {
        descInput.appendField(t(desc))
      } else {
        desc(descInput)
      }
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    if (typeof option.code === 'string') {
      return option.code
    } else if (isSkriptEventBlock(block)) {
      return option.code(block, generate)
    }
    return null
  }
  return { kind: 'block', type: blockKey }
}

export function registerSimpleEvent(option: SimpleEventOptions): Blockly.utils.toolbox.BlockInfo {
  const { blockKey, desc } = option
  const definition = createSkriptEventDefinition(option)
  const mixin: Partial<SkriptEventBlock> = {
    initShape_(this: SkriptBlock) {
      this.appendDummyInput().appendField(t(desc))
    },
  }

  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const code = SkriptCodeGenerator.codeJoin(option.code)
    return `${code}: \n${generate.statementToCode(block, 'block')}`
  }
  return { kind: 'block', type: blockKey }
}
