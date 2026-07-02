'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { Entities } from '../types/Entities'

const blockKey = 'event_teleport'
const syntax: EventSyntax = {
  title: 'Teleport',
  docId: 1053,
  eventValues: [
    'event-block',
    'event-chunk',
    'event-command sender',
    'event-entity',
    'event-entity type',
    'event-location',
    'event-player',
    'event-teleport cause',
    'event-world',
    'past event-chunk',
    'past event-location',
  ],
  cancellable: true,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_TELEPORT_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const statementMembers = generate.statementToCode(block, 'block')
    const entity = block.getFieldValue('entity')
    const code = SkriptCodeGenerator.codeJoin('on', [entity], 'teleport', generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
