'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const Difficulties: SkriptType = {
  name: 'difficulty',
  type: 'difficulty',
  options: ['easy', 'normal', 'hard', 'peaceful'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(Difficulties, 'Difficulties', 3367)
}