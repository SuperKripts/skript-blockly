'skript syntax'

// TODO: 实现 Click 事件
// 参考 Skript 官方注册:
// - 事件类: PlayerInteractEvent, PlayerInteractEntityEvent, PlayerInteractAtEntityEvent
// - 语法:
//   - "[(right|left)(| |-)][mouse(| |-)]click[ing] [on %-entitydata/itemtype/blockdata%] [(with|using|holding) %-itemtype%]"
//   - "[(right|left)(| |-)][mouse(| |-)]click[ing] (with|using|holding) %itemtype% on %entitydata/itemtype/blockdata%"

import * as Blockly from 'blockly/core'
import { registerSimpleEvent, type EventSyntax } from './SkriptEventBlock'

const blockKey = 'event_click'
const syntax: EventSyntax = {
  title: 'Click',
  eventValues: [],
  cancellable: false,
  docId: 0,
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return registerSimpleEvent({ blockKey, desc: 'EVENT_CLICK_DESC', code: 'on click', ...syntax })
}
