'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'

const blockKey = 'expression_allay_jukebox'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'Allay Target Jukebox', docUrl: getSkriptHubDocUrl(13367) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRESSION_ALLAY_JUKEBOX_DESC', {
        0: () => this.appendValueInput('entity').setCheck('livingentity'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'location')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const entity = generator.valueToCode(block, 'entity', Order.ATOMIC) || 'entity'
    return [`target jukebox of ${entity}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
