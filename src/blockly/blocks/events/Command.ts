'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import FieldDefaultTextInput from '@/blockly/inputs/FieldDefaultTextInput'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_command'
const syntax: EventSyntax = {
  title: 'Command',
  eventValues: ['event-command sender', 'event-player', 'event-world'],
  cancellable: true,
  docId: 1093,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_COMMAND_DESC', {
        0: () => input.appendField<string>(new FieldDefaultTextInput('EVENT_COMMAND_PLACEHOLDER'), 'command'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const command = block.getFieldValue('command')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on command', command ? `"${command}"` : '')
      return `${code}: \n${statementMembers}`
    },
  })
}
