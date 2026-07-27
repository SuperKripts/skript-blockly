'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'
import { createTempFieldDropdown } from '../types/Types'

const blockKey = 'exprassion_argb'

const ARGB_CHANNELS = ['alpha', 'red', 'green', 'blue']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'ARGB Color Value', docUrl: getSkriptHubDocUrl(0) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRASSION_ARGB_DESC', {
        0: () => this.appendValueInput('color').setCheck('color'),
        1: () => this.appendDummyInput().appendField(createTempFieldDropdown('exprassion_argb_channel', ARGB_CHANNELS), 'channel'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'number')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const color = generator.valueToCode(block, 'color', Order.ATOMIC) || 'color'
    const channel = block.getFieldValue('channel')
    return [`${channel} value of ${color}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
