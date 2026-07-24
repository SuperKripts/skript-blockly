'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const FishingStates: SkriptType = {
  name: 'fishing_state',
  type: 'fishingstate',
  options: ['fishing', 'caught fish', 'caught entity', 'in ground', 'failed attempt', 'reel in', 'bite', 'lured'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(FishingStates, 'FishingStates', 0)
}