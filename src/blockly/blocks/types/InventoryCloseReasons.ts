'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const InventoryCloseReasons: SkriptType = {
  name: 'inventory_close_reason',
  type: 'inventoryclosereason',
  options: ['unknown', 'teleport', 'cant use', 'unloaded', 'open new', 'player', 'disconnect', 'death', 'plugin'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(InventoryCloseReasons, 'InventoryCloseReasons', 0)
}