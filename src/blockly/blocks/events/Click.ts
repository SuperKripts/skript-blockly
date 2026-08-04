'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown, createTempFieldDropdown, createFieldSearchDropdown } from '../types/Types'
import { EntitiesItemBlock } from '../types/Other'
import { ItemTypes } from '../types/Materials'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_click'
const syntax: EventSyntax = {
  title: 'Click',
  eventValues: [],
  cancellable: false,
  docId: 1094,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_CLICK_DESC', {
        0: () => input.appendField(createTempFieldDropdown('click_type', ['', 'left', 'right']), 'click_type'),
        1: () => input.appendField(createFieldSearchDropdown(EntitiesItemBlock, true), 'click_target'),
        2: () => input.appendField(createFieldDropdown(ItemTypes, true), 'used_item'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const clickType = block.getFieldValue('click_type')
      const clickTarget = block.getFieldValue('click_target')
      const usedItem = block.getFieldValue('used_item')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on', clickType, 'click', ['on', clickTarget], ['with', usedItem])
      return `${code}: \n${statementMembers}`
    },
  })
}
