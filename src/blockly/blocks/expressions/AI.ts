'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'expression_ai'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'AI', docUrl: getSkriptHubDocUrl(4186) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      this.setInputsInline(true)
      pte('EXPRESSION_AI_DESC', {
        0: () => this.appendValueInput('entity').setCheck('livingentity'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_(this: SkriptBlock) {
      this.setOutput(true, 'boolean')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const entity = generator.valueToCode(block, 'entity', Order.ATOMIC) || 'entity'
    return [`ai of ${entity}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
