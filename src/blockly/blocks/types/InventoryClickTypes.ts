'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const InventoryClickTypes: SkriptType = {
  name: 'inventory_click_type',
  type: 'clicktype',
  options: [
    'left',
    'shift left',
    'right',
    'shift right',
    'window border left',
    'window border right',
    'middle',
    'number key',
    'double click',
    'drop',
    'control drop',
    'creative',
    'unknown',
    'swap offhand',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(InventoryClickTypes, 'InventoryClick', 0)
}