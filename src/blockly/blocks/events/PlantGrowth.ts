'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldSearchDropdown } from '../types/Types'
import { ItemTypes } from '../types/Materials'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_block_growth'
const syntax: EventSyntax = {
  title: 'Block Growth',
  docId: 1003,
  eventValues: ['event-block', 'event-location', 'event-world', 'past event-block'],
  cancellable: true,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_BLOCK_GROWTH_DESC', {
        0: () => input.appendField(createFieldSearchDropdown(ItemTypes, true), 'block'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on crop growth', ['of', block.getFieldValue('block')])
      return `${code}: \n${statementMembers}`
    },
  })
}
