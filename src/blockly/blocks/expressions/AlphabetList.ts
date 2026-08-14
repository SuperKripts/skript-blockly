'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptExpressionDefinition } from './ExpressionBlock'
import type { SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'expression_alphabet_list'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptExpressionDefinition({ title: 'Alphabetical Sort', docId: 906 })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRESSION_ALPHABET_LIST_DESC', {
        0: () => this.appendValueInput('strings').setCheck('string'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'string')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const strings = generator.valueToCode(block, 'strings', Order.ATOMIC) || 'strings'
    return [`alphabetically sorted ${strings}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
