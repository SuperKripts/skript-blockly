'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { FieldBlockData } from '@/blockly/inputs/FieldBlockData'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

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
    return registerEasyEvent({
      ...info.syntax,
      blockKey: info.blockKey,
      desc: (input) => {
        pte(info.blockKey.toUpperCase() + '_DESC', {
          0: () => input.appendField(new FieldBlockData(null, { withEmpty: true }), 'block'),
          default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
        })
      },
      code: (block, generate) => {
        const statementMembers = generate.statementToCode(block, 'block')
        const code = generate.codeJoin('on', info.code, ['of', block.getField('block')?.getText()])
        return `${code}: \n${statementMembers}`
      },
    })
  })
}
