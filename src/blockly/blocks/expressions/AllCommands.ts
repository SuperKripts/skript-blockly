'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptExpressionDefinition } from './ExpressionBlock'
import type { SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'
import { createTempFieldDropdown } from '../types/Types'

const blockKey = 'expression_all_commands'

const COMMAND_TYPES = ['commands', 'script commands']

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptExpressionDefinition({ title: 'All Commands', docId: 6319 })
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      pte('EXPRESSION_ALL_COMMANDS_DESC', {
        0: () => this.appendDummyInput().appendField(createTempFieldDropdown('expression_all_commands_type', COMMAND_TYPES), 'type'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, 'string')
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block) {
    const type = block.getFieldValue('type')
    return [`all ${type}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
