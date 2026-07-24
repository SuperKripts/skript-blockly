'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const TeleportFlags: SkriptType = {
  name: 'teleport_flag',
  type: 'teleportflag',
  options: [
    'retain open inventory',
    'retain passengers',
    'retain vehicle',
    'retain direction',
    'retain pitch',
    'retain yaw',
    'retain movement',
    'retain x',
    'retain y',
    'retain z',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(TeleportFlags, 'TeleportFlags', 0)
}