import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { generator, Order } from '@/blockly/generators/skript'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'

export type ConditionSyntax = {
  title: string
  docId: number
}

export const CONDITION_MODES = {
  be: ['is', 'is not'],
  can: ['can', "can't"],
  have: ['has', "don't have"],
  will: ['will', 'will not'],
}

export type ConditionMode = keyof typeof CONDITION_MODES

export function createConditionDropdown(mode: ConditionMode) {
  return createTempFieldDropdown(`condition_${mode}_mode`, CONDITION_MODES[mode])
}

export function createSkriptConditionDefinition(syntax: ConditionSyntax): SkriptBlockDefinition {
  const definition = createSkriptDefinition({ syntaxType: 'condition', title: syntax.title, docUrl: getSkriptHubDocUrl(syntax.docId) })
  const mixin: Partial<SkriptBlock> = {
    initStyle_() {
      this.setOutput(true, 'condition')
    },
  }
  return Object.assign(definition, mixin)
}

export type ModeConditionOptions = ConditionSyntax & {
  blockKey: string
  desc: string
  input: string[]
  mode: ConditionMode
  code: string
}

export function registerModeCondition(options: ModeConditionOptions): Blockly.utils.toolbox.BlockInfo {
  const { blockKey, desc, input, code, mode } = options
  const definition = createSkriptConditionDefinition(options)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte(desc, {
        0: () => this.appendValueInput('input').setCheck(input),
        1: () => this.appendDummyInput().appendField(createConditionDropdown(mode), 'mode'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  generator.forBlock[blockKey] = function (block, generator) {
    const inputValue = generator.valueToCode(block, 'input', Order.ATOMIC)
    if (!inputValue) {
      return null
    }
    const mode = block.getFieldValue('mode')
    return [`${inputValue} ${mode} ${code}`, Order.ATOMIC]
  }
  return { kind: 'block', type: blockKey }
}
