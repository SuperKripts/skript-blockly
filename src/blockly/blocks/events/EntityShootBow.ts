'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_entity_shoot_bow'
const syntax: EventSyntax = {
  title: 'Entity Shoot Bow',
  eventValues: ['event-command sender', 'event-entity', 'event-entity type', 'event-item stack', 'event-location', 'event-slot', 'event-world'],
  cancellable: true,
  docId: 13320,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_ENTITY_SHOOT_BOW_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const entity = block.getFieldValue('entity')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on', entity, 'shoot bow')
      return `${code}: \n${statementMembers}`
    },
  })
}
