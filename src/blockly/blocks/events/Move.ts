'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_move_rotate'
const syntax: EventSyntax = {
  title: 'Move / Rotate',
  docId: 10124,
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
    'future event-location',
    'past event-chunk',
    'past event-location',
  ],
  cancellable: true,
}

const moveModes = ['move', 'rotate', 'move_or_rotate']

const moveModeCodeMap: Record<string, string> = {
  move: 'move',
  rotate: 'turn around',
  move_or_rotate: 'move or turn around',
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_MOVE_ROTATE_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, false), 'entity'),
        1: () => input.appendField(createTempFieldDropdown('event_move_rotate', moveModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const mode = block.getFieldValue('mode')
      const code = generate.codeJoin('on', block.getFieldValue('entity'), moveModeCodeMap[mode])
      return `${code}: \n${statementMembers}`
    },
  })
}
