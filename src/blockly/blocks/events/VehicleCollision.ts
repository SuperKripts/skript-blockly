'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldSearchDropdown, createTempFieldDropdown, EntitiesItemBlock } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

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
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_VEHICLE_COLLISION_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_vehicle_collision', collisionModes), 'mode'),
        1: () => input.appendField(createFieldSearchDropdown(EntitiesItemBlock, true), 'target'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const mode = block.getFieldValue('mode')
    const target = block.getFieldValue('target')
    const code = SkriptCodeGenerator.codeJoin('on', collisionModeCodeMap[mode], target ? ['with', target] : '', generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
