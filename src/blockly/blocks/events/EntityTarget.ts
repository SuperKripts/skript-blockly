'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_target'
const syntax: EventSyntax = {
  title: 'Target',
  eventValues: ['event-command sender', 'event-entity', 'event-entity type', 'event-location', 'event-world'],
  cancellable: true,
  docId: 1007,
}

const targetModes = ['target', 'untarget']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_TARGET_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_target', targetModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const mode = block.getFieldValue('mode')
      const statementMembers = generate.statementToCode(block, 'block')
      const code = generate.codeJoin('on entity', mode)
      return `${code}: \n${statementMembers}`
    },
  })
}
