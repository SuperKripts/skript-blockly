'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const InventoryActions: SkriptType = {
  name: 'inventory_action',
  type: 'inventoryaction',
  options: [
    'nothing',
    'pickup all',
    'pickup some',
    'pickup half',
    'pickup one',
    'place all',
    'place some',
    'place one',
    'swap with cursor',
    'drop all cursor',
    'drop one cursor',
    'drop all slot',
    'drop one slot',
    'move to other inventory',
    'hotbar move and readd',
    'hotbar swap',
    'clone stack',
    'collect to cursor',
    'unknown',
    'pickup from bundle',
    'pickup all into bundle',
    'pickup some into bundle',
    'place from bundle',
    'place all into bundle',
    'place some into bundle',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(InventoryActions, 'InventoryActions', 0)
}