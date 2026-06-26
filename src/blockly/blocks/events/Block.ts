// 'skript syntax'

import * as Blockly from 'blockly/core'
import { createSkriptDefinition, getSkriptHubDocUrl, type SkriptBlock, type SkriptBlockDefinition } from '../SkriptBlock'
import { appendEventPriorityInput } from './EventPriority'
import { pte } from '@/locales/i18n'

type BlockEventInfo = {
  key: string
  title: string
  blockKey: string
  docId?: number
}

const BlockEventInfos: BlockEventInfo[] = [
  { key: 'break', title: 'Break / Mine', blockKey: 'event_break' },
  { key: 'burn', title: 'Burn', blockKey: 'event_burn' },
  { key: 'place', title: 'Place', blockKey: 'event_place' },
  { key: 'fade', title: 'Fade', blockKey: 'event_fade' },
  { key: 'form', title: 'Form', blockKey: 'event_form' },
  { key: 'block_drop', title: 'Block Drop', blockKey: 'event_block_drop' },
]

export function registerAll(): Blockly.utils.toolbox.BlockInfo[] {
  return BlockEventInfos.map((info) => {
    const definition = createSkriptDefinition({ key: info.key, title: info.title, syntaxType: 'event', docUrl: getSkriptHubDocUrl(info.docId) })
    const mixin: Partial<SkriptBlockDefinition> = {
      initShape_(this: SkriptBlock) {
        const input = this.appendDummyInput()
        pte(info.key.toUpperCase() + '_DESC', {
          // TODO 方块类型暂未实现
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
