'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const TreeTypes: SkriptType = {
  name: 'tree_type',
  type: 'tree_type',
  options: [
    'tree',
    'regular',
    'small regular',
    'big regular',
    'redwood',
    'small redwood',
    'big redwood',
    'mega redwood',
    'birch',
    'tall birch',
    'jungle',
    'small jungle',
    'big jungle',
    'cocoa tree',
    'acacia',
    'dark oak',
    'jungle bush',
    'swamp',
    'mushroom',
    'red mushroom',
    'brown mushroom',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(TreeTypes, 'Tree', 0)
}