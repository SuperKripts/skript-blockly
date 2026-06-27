'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_first_join'
const syntax: EventSyntax = {
  title: 'First Join',
  eventValues: ['event-player', 'event-world'],
  cancellable: false,
  docId: 1098,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_FIRST_JOIN_DESC', code: 'on first join', ...syntax })
}
