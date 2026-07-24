'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const TeleportCauses: SkriptType = {
  name: 'teleport_cause',
  type: 'teleportcause',
  options: ['chorus fruit', 'command', 'end gateway', 'end portal', 'ender pearl', 'nether portal', 'plugin', 'spectate', 'unknown', 'dismount', 'exit bed', 'consumable effect'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(TeleportCauses, 'TeleportCauses', 0)
}