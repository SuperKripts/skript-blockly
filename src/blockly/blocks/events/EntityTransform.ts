'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, Entities, TransformReasons } from '../types/Types'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_entity_transform'
const syntax: EventSyntax = {
  title: 'Entity Transform',
  eventValues: ['event-command sender', 'event-entities', 'event-entity', 'event-entity type', 'event-location', 'event-transform reason', 'event-world'],
  cancellable: true,
  docId: 10122,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_ENTITY_TRANSFORM_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        1: () => input.appendField(createFieldDropdown(TransformReasons, true), 'reason'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }
  Blockly.Blocks[blockKey] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const entity = block.getFieldValue('entity')
    const reason = block.getFieldValue('reason')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('on', entity === '' ? 'entity' : entity, 'transform', ['due to', reason], generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey }
}
