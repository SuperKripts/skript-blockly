'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_teleport'
const syntax: EventSyntax = {
  title: 'Teleport',
  docId: 1053,
  eventValues: [
    'event-block',
    'event-chunk',
    'event-command sender',
    'event-entity',
    'event-entity type',
    'event-location',
    'event-player',
    'event-teleport cause',
    'event-world',
    'past event-chunk',
    'past event-location',
  ],
  cancellable: true,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_TELEPORT_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const entity = block.getFieldValue('entity')
      const code = generate.codeJoin('on', [entity], 'teleport')
      return `${code}: \n${statementMembers}`
    },
  })
}
