'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const Fireworktypes: SkriptType = {
  name: 'firework_type',
  type: 'fireworktype',
  options: ['ball large', 'creeper', 'ball', 'star', 'burst'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(Fireworktypes, 'Fireworktypes', 0)
}