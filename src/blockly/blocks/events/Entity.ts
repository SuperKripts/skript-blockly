'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

type EntityEventInfo = {
  blockKey: string
  code: string
  syntax: EventSyntax
}

const EntityEventInfos: EntityEventInfo[] = [
  {
    blockKey: 'event_death',
    code: 'death',
    syntax: {
      title: 'Death',
      docId: 1001,
      eventValues: ['event-damage cause', 'event-damage source', 'event-item stacks', 'event-projectile'],
      cancellable: true,
    },
  },
  {
    blockKey: 'event_spawn',
    code: 'spawn',
    syntax: {
      title: 'Spawn',
      docId: 1002,
      eventValues: ['event-command sender', 'event-entity', 'event-entity type', 'event-item stack', 'event-location', 'event-projectile', 'event-spawn reason', 'event-world'],
      cancellable: true,
    },
  },
]

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return EntityEventInfos.map((info) => {
    return registerEasyEvent({
      ...info.syntax,
      blockKey: info.blockKey,
      desc: (input) => {
        pte(info.blockKey.toUpperCase() + '_DESC', {
          0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
          default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        })
      },
      code: (block, generate) => {
        const entity = block.getFieldValue('entity')
        const statementMembers = generate.statementToCode(block, 'block')
        const code = generate.codeJoin('on', info.code, ['of', entity])
        return `${code}: \n${statementMembers}`
      },
    })
  })
}
