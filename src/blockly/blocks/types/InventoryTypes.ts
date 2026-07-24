'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const InventoryTypes: SkriptType = {
  name: 'inventory_type',
  type: 'inventorytype',
  options: [
    'chest',
    'dispenser',
    'dropper',
    'furnace',
    'workbench',
    'crafting',
    'enchanting',
    'brewing',
    'player',
    'creative',
    'merchant',
    'ender chest',
    'anvil',
    'beacon',
    'hopper',
    'shulker box',
    'barrel',
    'blast furnace',
    'lectern',
    'smoker',
    'loom',
    'cartography',
    'grindstone',
    'stonecutter',
    'smithing',
    'composter',
    'chiseled bookshelf',
    'decorated pot',
    'crafter',
    'shelf',
    'jukebox',
    'smithing new',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(InventoryTypes, 'Inventory', 2148)
}