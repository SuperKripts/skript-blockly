'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_beacon_toggle'
const syntax: EventSyntax = {
  title: 'Beacon Toggle',
  eventValues: ['event-block', 'event-location', 'event-world'],
  cancellable: false,
  docId: 13319,
}

const toggleModes = ['toggle', 'activate', 'deactivate']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_BEACON_TOGGLE_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_beacon_toggle', toggleModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on beacon', block.getFieldValue('mode'))
      return `${code}: \n${statementMembers}`
    },
  })
}
