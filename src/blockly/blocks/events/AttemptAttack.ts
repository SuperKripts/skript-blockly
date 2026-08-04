'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_attempt_attack'
const syntax: EventSyntax = {
  title: 'Attempt Attack',
  eventValues: ['event-player', 'event-world'],
  cancellable: false,
  docId: 14679,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_ATTEMPT_ATTACK_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const entity = block.getFieldValue('entity')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin(entity === '' ? 'on attack attempt' : 'on attempt to attack', entity)
      return `${code}: \n${statementMembers}`
    },
  })
}
