'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_book_edit'
const syntax: EventSyntax = {
  title: 'Book Edit',
  eventValues: [],
  cancellable: true,
  docId: 0,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_BOOK_EDIT_DESC', code: 'on book edit', ...syntax })
}
