'skript syntax'

import * as Blockly from 'blockly/core'
import { type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput, generateCodeForEventPriority } from './EventPriority'
import { pte } from '@/locales/i18n'
import { createSkriptEventDefinition, type EventSyntax } from './SkriptEventBlock'
import CodeGenerator, { SkriptCodeGenerator } from '@/blockly/generators/skript'
import { FieldBlockData } from '@/blockly/inputs/FieldBlockData'

type BlockEventInfo = {
  blockKey: string
  code: string
  syntax: EventSyntax
}

const BlockEventInfos: BlockEventInfo[] = [
  {
    blockKey: 'event_break',
    code: 'break',
    syntax: {
      title: 'On Break / Mine',
      docId: 996,
      eventValues: ['event-block', 'event-entity', 'event-entity', 'event-location', 'event-player', 'event-world', 'future event-block', 'past event-block'],
      cancellable: true,
    },
  },
  {
    blockKey: 'event_burn',
    code: 'burn',
    syntax: {
      title: 'Burn',
      docId: 997,
      eventValues: ['event-block', 'event-location', 'event-world'],
      cancellable: true,
    },
  },
  {
    blockKey: 'event_place',
    code: 'place',
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
    blockKey: 'event_fade',
    code: 'fade',
    syntax: {
      title: 'Fade',
      docId: 999,
      eventValues: ['event-block', 'event-location', 'event-world', 'future event-block', 'past event-block'],
      cancellable: true,
    },
  },
  {
    blockKey: 'event_form',
    code: 'form',
    syntax: {
      title: 'Form',
      docId: 1000,
      eventValues: ['event-block', 'event-location', 'event-world', 'past event-block'],
      cancellable: true,
    },
  },
  {
    blockKey: 'event_block_drop',
    code: 'block drop',
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
          0: () => input.appendField(new FieldBlockData(void 0, { allowAny: true }), 'block'),
          default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        })
        appendEventPriorityInput(this)
      },
    }

    Blockly.Blocks[info.blockKey] = Object.assign(definition, mixin)
    CodeGenerator.forBlock[info.blockKey] = (block: Blockly.Block, generate: SkriptCodeGenerator) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const code = SkriptCodeGenerator.codeJoin('on', info.code, ['of', block.getField('block')?.getText()], generateCodeForEventPriority(block))
      return `${code}: \n${statementMembers}`
    }
    return { kind: 'block', type: info.blockKey }
  })
}
