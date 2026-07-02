'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

const blockKey = 'event_pressure_plate'
const syntax: EventSyntax = {
  title: 'Pressure Plate / Trip',
  docId: 1081,
  eventValues: ['event-block', 'event-direction', 'event-item stack', 'event-player', 'event-world'],
  cancellable: true,
}

const pressurePlateModes = ['pressure_plate', 'tripwire']

const pressurePlateCodeMap: Record<string, string> = {
  pressure_plate: 'on step on pressure plate',
  tripwire: 'on trip',
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_PRESSURE_PLATE_TRIP_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_pressure_plate', pressurePlateModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const mode = block.getFieldValue('mode')
    const code = SkriptCodeGenerator.codeJoin(pressurePlateCodeMap[mode], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
