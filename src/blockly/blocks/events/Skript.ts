'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_server_startstop'
const syntax: EventSyntax = {
  title: 'Server Start/Stop',
  docId: 995,
  eventValues: ['event-command sender'],
  cancellable: false,
}

const serverModes = ['start', 'stop']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_SERVER_STARTSTOP_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_server_startstop', serverModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const mode = block.getFieldValue('mode')
      const code = generate.codeJoin('on skript', mode)
      return `${code}: \n${statementMembers}`
    },
  })
}
