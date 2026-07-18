// 'skript syntax'

import * as Blockly from 'blockly/core'
import { type EventSyntax } from './SkriptEventBlock'

// TODO: Grow 事件实现
// - "grow[th] [of (1:%-structuretypes%|2:%-itemtypes/blockdatas%)]"
// - "grow[th] from %itemtypes/blockdatas%"
// - "grow[th] [in]to (1:%structuretypes%|2:%itemtypes/blockdatas%)"
// - "grow[th] from %itemtypes/blockdatas% [in]to (1:%structuretypes%|2:%itemtypes/blockdatas%)"

const blockKey = 'event_grow'
const syntax: EventSyntax = {
  title: 'Grow',
  eventValues: [],
  cancellable: false,
  docId: 1006,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return { kind: 'block', type: blockKey }
}
