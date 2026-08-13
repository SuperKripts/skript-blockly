'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'expression_altitude'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'Altitude', docUrl: getSkriptHubDocUrl(940) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRESSION_ALTITUDE_DESC', {
        0: () => this.appendValueInput('location').setCheck('location'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'number')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const location = generator.valueToCode(block, 'location', Order.ATOMIC) || 'location'
    return [`altitude of ${location}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
