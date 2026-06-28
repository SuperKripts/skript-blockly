'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { Entities } from '../types/Entities'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { registerSimpleEvent, createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'

const eventValues = [
  'event-block',
  'event-block data',
  'event-command sender',
  'event-entity',
  'event-entity type',
  'event-location',
  'event-world',
  'future event-block data',
  'past event-block',
]

const SimpleEvents = [
  {
    blockKey: 'event_enderman_place',
    code: 'on enderman place',
    title: 'Enderman Place',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
  {
    blockKey: 'event_enderman_pickup',
    code: 'on enderman pickup',
    title: 'Enderman Pickup',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
  {
    blockKey: 'event_sheep_eat',
    code: 'on sheep eat',
    title: 'Sheep Eat',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
  {
    blockKey: 'event_silverfish_enter',
    code: 'on silverfish enter',
    title: 'Silverfish Enter',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
  {
    blockKey: 'event_silverfish_exit',
    code: 'on silverfish exit',
    title: 'Silverfish Exit',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
  {
    blockKey: 'event_falling_block_fall',
    code: 'on falling block fall',
    title: 'Falling Block Fall',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
  {
    blockKey: 'event_falling_block_land',
    code: 'on falling block land',
    title: 'Falling Block Land',
    eventValues,
    cancellable: true,
    docId: 4499,
  },
]

const blockKey_entity_change_block = 'event_entity_change_block'
const syntax_entity_change_block: EventSyntax = {
  title: 'Entity Change Block',
  eventValues,
  cancellable: true,
  docId: 4499,
}

function registerEntityChangeBlock(): Blockly.utils.toolbox.BlockInfo {
  const definition = createSkriptEventDefinition(syntax_entity_change_block)
  const mixin: Partial<SkriptBlockDefinition> = {
    initShape_(this: SkriptBlock) {
      const input = this.appendDummyInput()
      pte('EVENT_ENTITY_CHANGE_BLOCK_DESC', {
        0: () => input.appendField(createFieldDropdown(Entities, true), 'entity'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
      appendEventPriorityInput(this)
    },
    updateShape_() {},
  }

  Blockly.Blocks[blockKey_entity_change_block] = Object.assign(definition, mixin)
  CodeGenerator.forBlock[blockKey_entity_change_block] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
    const entity = block.getFieldValue('entity')
    const statementMembers = generate.statementToCode(block, 'block')
    const code = SkriptCodeGenerator.codeJoin('on', entity === '' ? 'entity' : entity, 'change block', generateCodeForEventPriority(block))
    return `${code}: \n${statementMembers}`
  }
  return { kind: 'block', type: blockKey_entity_change_block }
}

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return [
    ...SimpleEvents.map((info) =>
      registerSimpleEvent({
        title: info.title,
        blockKey: info.blockKey,
        docId: info.docId,
        desc: info.blockKey.toUpperCase() + '_DESC',
        code: info.code,
        eventValues: info.eventValues,
        cancellable: info.cancellable,
      }),
    ),
    registerEntityChangeBlock(),
  ]
}
