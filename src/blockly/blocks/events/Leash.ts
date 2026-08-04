'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_leash'
const syntax: EventSyntax = {
  title: 'Leash / Unleash',
  docId: 12795,
  eventValues: ['event-command sender', 'event-entity', 'event-entity type', 'event-location', 'event-player', 'event-unleash reason', 'event-world'],
  cancellable: true,
}

const leashModes = ['leash', 'unleash']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_LEASH_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_leash', leashModes), 'mode'),
        1: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on', block.getFieldValue('mode'), ['of', block.getFieldValue('entity')])
      return `${code}: \n${statementMembers}`
    },
  })
}
