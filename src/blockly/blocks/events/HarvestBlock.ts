'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldSearchDropdown } from '../types/Types'
import { ItemOrBlock } from '../types/Materials'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_harvest_block'
const syntax: EventSyntax = {
  title: 'Harvest Block',
  eventValues: ['event-block', 'event-equipment slot', 'event-item stacks', 'event-player', 'event-slot', 'event-world'],
  cancellable: true,
  docId: 13797,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_HARVEST_BLOCK_DESC', {
        0: () => input.appendField(createFieldSearchDropdown(ItemOrBlock, true), 'block'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const blockType = block.getFieldValue('block')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on harvest', ['of', blockType])
      return `${code}: \n${statementMembers}`
    },
  })
}
