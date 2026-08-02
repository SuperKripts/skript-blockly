'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'
import { createConditionDropdown } from './Condition'

const blockKey = 'condition_ai'

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'condition', title: 'Has AI', docUrl: getSkriptHubDocUrl(4170) })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('CONDITION_AI_DESC', {
        0: () => this.appendValueInput('entity').setCheck('livingentity'),
        1: () => this.appendDummyInput().appendField(createConditionDropdown(), 'mode'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
      this.mixin({
        onchange(this: SkriptBlock, event: Blockly.Events.Abstract) {
          if (event.type === 'change') {
            this.setWarningText(null)
          }
        },
      })
    },
    initStyle_() {
      this.setOutput(true, 'condition')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block, generator) {
    const entity = generator.valueToCode(block, 'entity', Order.ATOMIC)
    if (!entity) {
      block.setWarningText('123')
      return null
    }
    const mode = block.getFieldValue('mode')
    return [`${entity} ${mode} ai`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
