'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'
import { createTempFieldDropdown } from '../types/Types'

const blockKey = 'expression_age'

const AGE_TYPES = ['age', 'maximum age']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'Age', docUrl: getSkriptHubDocUrl(9480) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRESSION_AGE_DESC', {
        0: () => this.appendValueInput('target').setCheck(['block', 'entity']),
        1: () => this.appendDummyInput().appendField(createTempFieldDropdown('expression_age_type', AGE_TYPES), 'ageType'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'number')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const target = generator.valueToCode(block, 'target', Order.ATOMIC) || 'target'
    const ageType = block.getFieldValue('ageType')
    return [`${ageType} of ${target}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
