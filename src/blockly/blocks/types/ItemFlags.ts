'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ItemFlags: SkriptType = {
  name: 'item_flag',
  type: 'item_flag',
  options: [
    'hide additional tooltip',
    'hide armor trim',
    'hide attributes',
    'hide destroys',
    'hide dye',
    'hide enchants',
    'hide placed on',
    'hide stored enchants',
    'hide unbreakable',
    'hide potion effects',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ItemFlags, 'ItemFlags', 0)
}