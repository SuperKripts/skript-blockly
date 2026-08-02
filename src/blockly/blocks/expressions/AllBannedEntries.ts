'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlockDefinition } from '../SkriptBlock'
import { pte } from '@/locales/i18n'
import { generator, Order } from '@/blockly/generators/skript'
import { createTempFieldDropdown } from '../types/Types'

const blockKey = 'exprassion_all_banned_entries'

const BANNED_TYPES = ['players', 'ips']

const TYPE_OUTPUTS: Record<string, string> = {
  players: 'offlineplayer',
  ips: 'string',
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptDefinition({ syntaxType: 'expression', title: 'All Banned Entries', docUrl: getSkriptHubDocUrl(9481) })

  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_() {
      this.setInputsInline(true)
      const validator = (s: string) => {
        this.setOutput(true, TYPE_OUTPUTS[s])
        return s
      }
      pte('EXPRASSION_ALL_BANNED_ENTRIES_DESC', {
        0: () => this.appendDummyInput().appendField(createTempFieldDropdown('exprassion_all_banned_entries_type', BANNED_TYPES, validator), 'type'),
        default: ({ msg, index }) => this.appendDummyInput().appendField(msg, 'part-' + index),
      })
    },
    initStyle_() {
      this.setOutput(true, null) // 初始无输出类型，由 validator 动态修改
    },
  }

  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)

  generator.forBlock[blockKey] = function (block) {
    const type = block.getFieldValue('type')
    return [`all banned ${type}`, Order.ATOMIC]
  }

  return { kind: 'block', type: blockKey }
}
