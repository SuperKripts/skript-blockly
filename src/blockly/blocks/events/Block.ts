'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import { createFieldSearchDropdown } from '../types/Types'
import { BlockDatas } from '../types/Materials'

type BlockEventInfo = {
  key: string
  blockKey: string
  syntax: EventSyntax
}

const BlockEventInfos: BlockEventInfo[] = [
  {
    key: 'break',
    blockKey: 'event_break',
    syntax: {
      title: 'On Break / Mine',
      docId: 996,
      eventValues: ['event-block', 'event-entity', 'event-entity', 'event-location', 'event-player', 'event-world', 'future event-block', 'past event-block'],
      cancellable: true,
    },
  },
  {
    key: 'burn',
    blockKey: 'event_burn',
    syntax: {
      title: 'Burn',
      docId: 997,
      eventValues: ['event-block', 'event-location', 'event-world'],
      cancellable: true,
    },
  },
  {
    key: 'place',
    blockKey: 'event_place',
    syntax: {
      title: 'Place',
      docId: 998,
      eventValues: [
        'event-block',
        'event-direction',
        'event-entity',
        'event-item stack',
        'event-location',
        'event-player',
        'event-world',
        'future event-item stack',
        'past event-block',
        'past event-item stack',
      ],
      cancellable: true,
    },
  },
  {
    key: 'fade',
    blockKey: 'event_fade',
    syntax: {
      title: 'Fade',
      docId: 999,
      eventValues: ['event-block', 'event-location', 'event-world', 'future event-block', 'past event-block'],
      cancellable: true,
    },
  },
  {
    key: 'form',
    blockKey: 'event_form',
    syntax: {
      title: 'Form',
      docId: 1000,
      eventValues: ['event-block', 'event-location', 'event-world', 'past event-block'],
      cancellable: true,
    },
  },
  {
    key: 'block_drop',
    blockKey: 'event_block_drop',
    syntax: {
      title: 'Block Drop',
      docId: 12314,
      eventValues: ['event-block', 'event-entities', 'event-item stacks', 'event-location', 'event-player', 'event-world', 'past event-block'],
      cancellable: true,
    },
  },
]

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return BlockEventInfos.map((info) => {
    const definition = createSkriptEventDefinition(info.syntax)
    const mixin: Partial<SkriptBlockDefinition> = {
      initShape_(this: SkriptBlock) {
        const input = this.appendDummyInput()
        pte(info.blockKey.toUpperCase() + '_DESC', {
          0: () => input.appendField(createFieldSearchDropdown(BlockDatas)),
          default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        })
        appendEventPriorityInput(this)
      },
      updateShape_() {},
    }

    Blockly.Blocks[info.blockKey] = Object.assign(definition, mixin)
    return { kind: 'block', type: info.blockKey }
  })
}
