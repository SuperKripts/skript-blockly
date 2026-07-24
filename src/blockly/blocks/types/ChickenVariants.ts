'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ChickenVariants: SkriptType = {
  name: 'chicken_variant',
  type: 'chickenvariant',
  options: ['cold', 'temperate', 'warm'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ChickenVariants, 'ChickenVariants', 0)
}