'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_book_sign'
const syntax: EventSyntax = {
  title: 'Book Sign',
  eventValues: ['event-item stack', 'event-player', 'event-texts', 'event-world', 'past event-item stack', 'past event-texts'],
  cancellable: true,
  docId: 1095,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_BOOK_SIGN_DESC', code: 'on book sign', ...syntax })
}
