'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_book_edit'
const syntax: EventSyntax = {
  title: 'Book Edit',
  eventValues: ['event-item stack', 'event-player', 'event-texts', 'event-world', 'past event-item stack', 'past event-texts'],
  cancellable: true,
  docId: 1080,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_BOOK_EDIT_DESC', code: 'on book edit', ...syntax })
}
