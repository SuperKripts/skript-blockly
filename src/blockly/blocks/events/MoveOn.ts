'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldSearchDropdown } from '../types/Types'
import { ItemTypes } from '../types/Materials'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_move_on'
const syntax: EventSyntax = {
  title: 'Move On',
  eventValues: ['event-block', 'event-chunk', 'event-location', 'event-player', 'event-teleport cause', 'event-world', 'past event-chunk', 'past event-location'],
  cancellable: true,
  docId: 1082,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_MOVE_ON_DESC', {
        0: () => input.appendField(createFieldSearchDropdown(ItemTypes, false), 'block'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on walking on', block.getFieldValue('block'))
      return `${code}: \n${statementMembers}`
    },
  })
}
