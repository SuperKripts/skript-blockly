'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const FrogVariants: SkriptType = {
  name: 'frog_variant',
  type: 'frogvariant',
  options: ['cold', 'temperate', 'warm'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(FrogVariants, 'FrogVariants', 9787)
}