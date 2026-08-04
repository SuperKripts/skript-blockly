'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { TransformReasons } from '../types/TransformReasons'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_entity_transform'
const syntax: EventSyntax = {
  title: 'Entity Transform',
  eventValues: ['event-command sender', 'event-entities', 'event-entity', 'event-entity type', 'event-location', 'event-transform reason', 'event-world'],
  cancellable: true,
  docId: 10122,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_ENTITY_TRANSFORM_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        1: () => input.appendField(createFieldDropdown(TransformReasons, true), 'reason'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const entity = block.getFieldValue('entity')
      const reason = block.getFieldValue('reason')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on', entity === '' ? 'entity' : entity, 'transform', ['due to', reason])
      return `${code}: \n${statementMembers}`
    },
  })
}
