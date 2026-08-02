'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'exprassion_amount'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'Amount', docUrl: getSkriptHubDocUrl(967) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRASSION_AMOUNT_DESC', {
        0: () => this.appendValueInput('target').setCheck(null),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'number')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const target = generator.valueToCode(block, 'target', Order.ATOMIC)
    return [`amount of ${target}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
