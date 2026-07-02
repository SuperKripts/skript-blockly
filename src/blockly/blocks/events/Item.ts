'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createFieldSearchDropdown } from '../types/Types'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { ItemTypes } from '../types/Materials'

type ItemEventInfo = {
  blockKey: string
  code: string
  syntax: EventSyntax
  ofPrefix?: string
  hasItem?: boolean
}

const ItemEventInfos: ItemEventInfo[] = [
  {
    blockKey: 'event_dispense',
    code: 'dispense',
    syntax: {
      title: 'Dispense',
      docId: 1083,
      eventValues: ['event-block', 'event-item stack', 'event-location', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_item_spawn',
    code: 'item spawn',
    syntax: {
      title: 'Item Spawn',
      docId: 1084,
      eventValues: ['event-command sender', 'event-entity', 'event-entity type', 'event-item stack', 'event-location', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_drop',
    code: 'drop',
    syntax: {
      title: 'Drop',
      docId: 1085,
      eventValues: ['event-command sender', 'event-dropped item', 'event-entity', 'event-entity type', 'event-item stack', 'event-location', 'event-player', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_craft',
    code: 'craft',
    syntax: {
      title: 'Craft',
      docId: 1086,
      eventValues: ['event-click type', 'event-inventory', 'event-inventory action', 'event-item stack', 'event-player', 'event-slot', 'event-text', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_prepare_craft',
    code: 'prepare craft',
    syntax: {
      title: 'Prepare Craft',
      docId: 1087,
      eventValues: ['event-inventory', 'event-item stack', 'event-player', 'event-slot', 'event-text'],
      cancellable: false,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_pick_up',
    code: 'pick up',
    syntax: {
      title: 'Pick Up',
      docId: 1088,
      eventValues: [
        'event-command sender',
        'event-dropped item',
        'event-entity',
        'event-entity type',
        'event-item stack',
        'event-item type',
        'event-location',
        'event-player',
        'event-projectile',
        'event-world',
      ],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_consume',
    code: 'consume',
    syntax: {
      title: 'Consume',
      docId: 1089,
      eventValues: ['event-item stack', 'event-player', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_inventory_click',
    code: 'inventory click',
    syntax: {
      title: 'Inventory Click',
      docId: 1090,
      eventValues: ['event-click type', 'event-inventory', 'event-inventory action', 'event-item stack', 'event-player', 'event-slot', 'event-text', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
    ofPrefix: 'at',
  },
  {
    blockKey: 'event_item_despawn',
    code: 'item despawn',
    syntax: {
      title: 'Item Despawn',
      docId: 2476,
      eventValues: ['event-command sender', 'event-dropped item', 'event-entity', 'event-entity type', 'event-item stack', 'event-location', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_item_merge',
    code: 'item merge',
    syntax: {
      title: 'Item Merge',
      docId: 2477,
      eventValues: [
        'event-command sender',
        'event-dropped item',
        'event-entity',
        'event-entity type',
        'event-item stack',
        'event-location',
        'event-world',
        'future event-dropped item',
      ],
      cancellable: true,
    },
    hasItem: true,
  },
  {
    blockKey: 'event_inventory_item_move',
    code: 'inventory item move',
    syntax: {
      title: 'Inventory Item Move',
      docId: 10123,
      eventValues: ['event-block', 'event-inventory', 'event-item stack', 'future event-block', 'future event-inventory'],
      cancellable: true,
    },
    hasItem: false,
  },
  {
    blockKey: 'event_stonecutter',
    code: 'stonecutting',
    syntax: {
      title: 'Stonecutter Recipe Select',
      docId: 10129,
      eventValues: ['event-item stack', 'event-player', 'event-world'],
      cancellable: true,
    },
    hasItem: true,
  },
]

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return ItemEventInfos.map((info) => {
    const definition = createSkriptEventDefinition(info.syntax)
    const mixin: Partial<SkriptBlockDefinition> = {
      initShape_(this: SkriptBlock) {
        const input = this.appendDummyInput()
        if (info.hasItem) {
          pte(info.blockKey.toUpperCase() + '_DESC', {
            0: () => input.appendField(createFieldSearchDropdown(ItemTypes, true), 'item'),
            default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
          })
        } else {
          pte(info.blockKey.toUpperCase() + '_DESC', {
            default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
          })
        }
        appendEventPriorityInput(this)
      },
    }

    Blockly.Blocks[info.blockKey] = Object.assign(definition, mixin)
    CodeGenerator.forBlock[info.blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const ofPrefix = info.ofPrefix ?? 'of'
      const code = info.hasItem
        ? SkriptCodeGenerator.codeJoin('on', info.code, [ofPrefix, block.getFieldValue('item')], generateCodeForEventPriority(block))
        : SkriptCodeGenerator.codeJoin('on', info.code, generateCodeForEventPriority(block))
      return `${code}: \n${statementMembers}`
    }
    return { kind: 'block', type: info.blockKey }
  })
}
