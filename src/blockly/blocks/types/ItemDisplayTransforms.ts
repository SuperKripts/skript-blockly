'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ItemDisplayTransforms: SkriptType = {
  name: 'item_display_transform',
  type: 'itemdisplaytransform',
  options: [
    'firstperson lefthand',
    'firstperson righthand',
    'fixed',
    'ground',
    'gui',
    'head',
    'none',
    'thirdperson lefthand',
    'thirdperson righthand',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ItemDisplayTransforms, 'ItemDisplayTransforms', 0)
}