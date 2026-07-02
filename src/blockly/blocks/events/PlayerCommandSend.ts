'skript syntax'

import { registerSimpleEvent } from './SkriptEventBlock'

export function register() {
  return registerSimpleEvent({
    blockKey: 'event_send_command_list',
    title: 'Send Command List',
    code: 'on send command list',
    desc: 'EVENT_SEND_COMMAND_LIST_DESC',
    docId: 10128,
    eventValues: ['event-player', 'event-world'],
    cancellable: false,
  })
}
