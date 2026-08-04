'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { HealReasons } from '../types/HealReasons'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_heal'
const syntax: EventSyntax = {
  title: 'Heal',
  eventValues: ['event-command sender', 'event-entity', 'event-entity type', 'event-heal reason', 'event-location', 'event-world'],
  cancellable: true,
  docId: 1029,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_HEAL_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        1: () => input.appendField(createFieldDropdown(HealReasons, true), 'reason'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const entity = block.getFieldValue('entity')
      const reason = block.getFieldValue('reason')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on heal', ['of', entity], ['by', reason])
      return `${code}: \n${statementMembers}`
    },
  })
}
