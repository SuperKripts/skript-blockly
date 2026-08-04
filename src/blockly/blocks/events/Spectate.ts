'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_spectate'
const syntax: EventSyntax = {
  title: 'Spectate',
  docId: 9461,
  eventValues: ['event-player', 'event-world'],
  cancellable: true,
}

const spectateModes = ['start', 'stop', 'swap']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_SPECTATE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_spectate', spectateModes), 'mode'),
        1: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const mode = block.getFieldValue('mode')
      const entity = block.getFieldValue('entity')
      const code = generate.codeJoin('on player', mode, 'spectating', ['of', entity])
      return `${code}: \n${statementMembers}`
    },
  })
}
