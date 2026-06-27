'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_experience_spawn'
const syntax: EventSyntax = {
  title: 'Experience Spawn',
  eventValues: ['event-experience point', 'event-location'],
  cancellable: true,
  docId: 1011,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_EXPERIENCE_SPAWN_DESC', code: 'on experience spawn', ...syntax })
}
