'skript syntax'

import { registerSimpleEvent } from './SkriptEventBlock'

export function register() {
  return registerSimpleEvent({
    blockKey: 'event_player_chunk_enter',
    title: 'Player Chunk Enter',
    code: 'on player enters a chunk',
    desc: 'EVENT_PLAYER_CHUNK_ENTER_DESC',
    docId: 10125,
    eventValues: [
      'event-block',
      'event-chunk',
      'event-location',
      'event-player',
      'event-teleport cause',
      'event-world',
      'past event-chunk',
      'past event-location',
    ],
    cancellable: true,
  })
}
