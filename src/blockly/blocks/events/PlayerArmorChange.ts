'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'

const blockKey = 'event_armor_change'
const syntax: EventSyntax = {
  title: 'Armor Change',
  docId: 6344,
  eventValues: ['event-equipment slot', 'event-player', 'event-slot', 'event-world', 'future event-item stack', 'past event-item stack'],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_ARMOR_CHANGE_DESC', {
        0: () => input.appendField(createFieldDropdown({ name: 'equipment_slot', options: ['head', 'chest', 'legs', 'feet'] }, true), 'slot'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const slot = block.getFieldValue('slot')
    const code = slot
      ? SkriptCodeGenerator.codeJoin('on', slot, 'change', generateCodeForEventPriority(block))
      : SkriptCodeGenerator.codeJoin('on armor change', generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
