'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const Directions: SkriptType = {
  name: 'direction',
  type: 'direction',
  options: ['meter', 'at', 'up', 'down', 'north', 'east', 'south', 'west', 'above', 'below', 'front', 'behind', 'right', 'left'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(Directions, 'Directions', 2142)
}