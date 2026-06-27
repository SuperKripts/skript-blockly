'skript syntax'

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_firework_explode'
const syntax: EventSyntax = {
  title: 'Firework Explode',
  eventValues: [
    'event-colors',
    'event-command sender',
    'event-entity',
    'event-entity type',
    'event-firework effect',
    'event-location',
    'event-projectile',
    'event-world',
  ],
  cancellable: true,
  docId: 3724,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_FIREWORK_EXPLODE_DESC', code: 'on firework explode', ...syntax })
}
