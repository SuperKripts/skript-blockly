'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_experience_change'
const syntax: EventSyntax = {
  title: 'Experience Change',
  eventValues: ['event-experience point', 'event-player', 'event-world'],
  cancellable: false,
  docId: 9454,
}

const changeModes = ['change', 'increase', 'decrease']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_EXPERIENCE_CHANGE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_experience_change', changeModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const mode = block.getFieldValue('mode')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on experience', mode)
      return `${code}: \n${statementMembers}`
    },
  })
}
