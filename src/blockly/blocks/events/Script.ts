'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_script'
const syntax: EventSyntax = {
  title: 'Script Load/Unload',
  docId: 1092,
  eventValues: ['event-command sender'],
  cancellable: false,
}

const scriptModes = ['load', 'unload']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_SCRIPT_LOADUNLOAD_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_script', scriptModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const mode = block.getFieldValue('mode')
      const code = generate.codeJoin('on', mode)
      return `${code}: \n${statementMembers}`
    },
  })
}
