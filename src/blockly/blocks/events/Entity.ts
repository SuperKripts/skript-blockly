'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, Entities } from '../types/Types'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

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
    const definition = createSkriptEventDefinition(info.syntax)
    const mixin: Partial<SkriptBlockDefinition> = {
      initShape_(this: SkriptBlock) {
        const input = this.appendDummyInput()
        pte(info.blockKey.toUpperCase() + '_DESC', {
          0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
          default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        })
        appendEventPriorityInput(this)
      },
      updateShape_() {},
    }

    Blockly.Blocks[info.blockKey] = Object.assign(definition, mixin)
    CodeGenerator.forBlock[info.blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
      const entity = block.getFieldValue('entity')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = SkriptCodeGenerator.codeJoin('on', info.code, ['of', entity], generateCodeForEventPriority(block))
      return `${code}: \n${statementMembers}`
    }
    return { kind: 'block', type: info.blockKey }
  })
}
