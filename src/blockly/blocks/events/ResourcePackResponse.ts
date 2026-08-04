'skript syntax'

import * as Blockly from 'blockly/core'
import { pte } from '@/locales/i18n'
import { createFieldDropdown } from '../types/Types'
import { ResourcePackStates } from '../types/ResourcePackStates'
import { registerEasyEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_resource_pack_response'
const syntax: EventSyntax = {
  title: 'Resource Pack Request Response',
  docId: 3725,
  eventValues: ['event-player', 'event-world'],
  cancellable: false,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerEasyEvent({
    ...syntax,
    blockKey,
    desc: (input) => {
      pte('EVENT_RESOURCE_PACK_REQUEST_RESPONSE_DESC', {
        0: () => input.appendField(createFieldDropdown(ResourcePackStates, true), 'state'),
        default: ({ msg, index }) => input.appendField(msg, 'part-' + index),
      })
    },
    code: (block, generate) => {
      const statementMembers = generate.statementToCode(block, 'block')
      const state = block.getFieldValue('state')
      const code = generate.codeJoin('on resource pack', state === '' ? 'request response' : state)
      return `${code}: \n${statementMembers}`
    },
  })
}
