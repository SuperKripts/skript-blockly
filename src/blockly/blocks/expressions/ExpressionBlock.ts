import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, registerContentMenuGetOption, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { generator, Order } from '@/blockly/generators/skript'
import { pte, t } from '@/locales/i18n'

export type ExpressionSyntax = {
  title: string
  docId: number
}

export type SimplePropertyExpressionOptions = ExpressionSyntax & {
  blockKey: string
  desc: string
  input: string[] | null
  output: string[] | null
  code: string
}

export type SimpleExpressionOptions = ExpressionSyntax & {
  blockKey: string
  desc: string
  output: string[] | null
  code: string
  supportedEvents?: string[]
}

// 以后便与集成表达式的 change
export function createSkriptExpressionDefinition(syntax: ExpressionSyntax): SkriptBlockDefinition {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: syntax.title, docUrl: getSkriptHubDocUrl(syntax.docId) })
  const mixin: Partial<SkriptBlock> = {}
  return Object.assign(definition, mixin)
}

export function registerSimpleExpression(options: SimpleExpressionOptions): Blockly.utils.toolbox.BlockInfo {
  const { blockKey, desc, output, code, supportedEvents } = options
  const definition = createSkriptExpressionDefinition(options)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      if (supportedEvents && supportedEvents.length > 0) {
        this.mixin({ supportedEvents_: supportedEvents })
      }
      this.setInputsInline(true)
      this.appendDummyInput().appendField(t(desc))
    },
    initStyle_() {
      this.setOutput(true, output)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  if (supportedEvents && supportedEvents.length > 0) {
    registerContentMenuGetOption(blockKey, 1000, blockKey, supportedEvents, desc)
  }
  generator.forBlock[blockKey] = function () {
    return [code, Order.ATOMIC]
  }
  return { kind: 'block', type: blockKey }
}

export function registerSimplePropertyExpression(options: SimplePropertyExpressionOptions): Blockly.utils.toolbox.BlockInfo {
  const { blockKey, desc, input, output, code } = options
  const definition = createSkriptExpressionDefinition(options)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte(desc, {
        0: () => this.appendValueInput('input').setCheck(input),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, output)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  generator.forBlock[blockKey] = function (block, generator) {
    const input = generator.valueToCode(block, 'input', Order.ATOMIC)
    if (!input) {
      return null
    }

    // 后续可能考虑支持不同风格的代码
    // return [`${input}'s ${code}`, Order.ATOMIC]
    return [`${code} of ${input}`, Order.ATOMIC]
  }
  return { kind: 'block', type: blockKey }
}
