'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { FieldTime } from '@/blockly/inputs/FieldTime'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_real_time'
const syntax: EventSyntax = {
  title: 'System Time',
  docId: 13321,
  eventValues: [],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_REAL_TIME_DESC', {
        0: () => input.appendField<string>(new FieldTime(), 'time'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const time = block.getFieldValue('time')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('at', time, 'in real time')
      return `${code}: \n${statementMembers}`
    },
  })
}
