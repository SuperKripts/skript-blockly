'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_armor_change'
const syntax: EventSyntax = {
  title: 'Armor Change',
  docId: 6344,
  eventValues: ['event-equipment slot', 'event-player', 'event-slot', 'event-world', 'future event-item stack', 'past event-item stack'],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_ARMOR_CHANGE_DESC', {
        0: () => input.appendField(createFieldDropdown({ name: 'equipment_slot', type: 'equipmentslot', options: ['head', 'chest', 'legs', 'feet'] }, true), 'slot'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const slot = block.getFieldValue('slot')
      const code = slot ? generate.codeJoin('on', slot, 'change') : generate.codeJoin('on armor change')
      return `${code}: \n${statementMembers}`
    },
  })
}
