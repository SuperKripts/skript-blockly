'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_level_change'
const syntax: EventSyntax = {
  title: 'Level Change',
  eventValues: ['event-player', 'event-world'],
  cancellable: false,
  docId: 1049,
}

const changeModes = ['change', 'up', 'down']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_LEVEL_CHANGE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_level_change', changeModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const mode = block.getFieldValue('mode')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on level', mode)
      return `${code}: \n${statementMembers}`
    },
  })
}
