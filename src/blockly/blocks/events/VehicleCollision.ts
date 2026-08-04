'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldSearchDropdown, createTempFieldDropdown } from '../types/Types'
import { EntitiesItemBlock } from '../types/Other'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_vehicle_collision'
const syntax: EventSyntax = {
  title: 'Vehicle Collision',
  docId: 12796,
  eventValues: ['event-block', 'event-entity', 'event-vehicle', 'event-world'],
  cancellable: false,
}

const collisionModes = ['any', 'block', 'entity']

const collisionModeCodeMap: Record<string, string> = {
  any: 'vehicle collision',
  block: 'vehicle block collision',
  entity: 'vehicle entity collision',
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_VEHICLE_COLLISION_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_vehicle_collision', collisionModes), 'mode'),
        1: () => input.appendField(createFieldSearchDropdown(EntitiesItemBlock, true), 'target'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const mode = block.getFieldValue('mode')
      const target = block.getFieldValue('target')
      const code = generate.codeJoin('on', collisionModeCodeMap[mode], target ? ['with', target] : '')
      return `${code}: \n${statementMembers}`
    },
  })
}
