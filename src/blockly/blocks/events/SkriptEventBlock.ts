import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { t } from '@/locales/i18n'

export type EventSyntax = {
  title: string
  docId: number
  eventValues?: string[]
  cancellable?: boolean
}

export type SimpleEventOptions = {
  blockKey: string
  title: string
  docId: number
  desc: string
  code: string
  eventValues?: string[]
  cancellable?: boolean
}

export type SkriptEventBlock = SkriptBlock & {
  cancellable_: boolean
  eventValues_: string[]
}

export function isSkriptEventBlock(block: Blockly.Block): block is SkriptEventBlock {
  return block.getStyleName() === 'event'
}

export function createSkriptEventDefinition(syntax: EventSyntax): SkriptBlockDefinition {
  const { title, docId, eventValues = [], cancellable = false } = syntax
  const definition = createSkriptDefinition({ title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(docId) })
  const mixin: Partial<SkriptEventBlock> = {
    cancellable_: cancellable,
    eventValues_: eventValues,
  }
  return Object.assign(definition, mixin)
}

export function registerSimpleEvent(option: SimpleEventOptions): Blockly.utils.toolbox.BlockInfo {
  const { blockKey, desc } = option
  const definition = createSkriptEventDefinition(option)
  const mixin: Partial<SkriptEventBlock> = {
    initShape_(this: SkriptBlock) {
      this.appendDummyInput().appendField(t(desc))
      appendEventPriorityInput(this)
    },
  }

  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const code = SkriptCodeGenerator.codeJoin(option.code, generateCodeForEventPriority(block))
    return `${code}: \n${generate.statementToCode(block, 'block')}`
  }
  return { kind: 'block', type: blockKey }
}
