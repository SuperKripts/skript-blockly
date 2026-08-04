'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createTempFieldDropdown } from '../types/Types'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_portal'
const syntax: EventSyntax = {
  title: 'Portal',
  docId: 1050,
  eventValues: [
    'event-block',
    'event-chunk',
    'event-command sender',
    'event-entity',
    'event-entity type',
    'event-location',
    'event-player',
    'event-teleport cause',
    'event-world',
    'past event-chunk',
    'past event-location',
  ],
  cancellable: true,
}

const portalModes = ['player', 'entity']

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_PORTAL_DESC', {
        0: () => input.appendField(createTempFieldDropdown('event_portal', portalModes), 'mode'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const mode = block.getFieldValue('mode')
      const code = generate.codeJoin('on', mode, 'portal')
      return `${code}: \n${statementMembers}`
    },
  })
}
