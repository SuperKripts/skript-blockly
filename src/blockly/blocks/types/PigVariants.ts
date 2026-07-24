'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const PigVariants: SkriptType = {
  name: 'pig_variant',
  type: 'pigvariant',
  options: ['cold', 'temperate', 'warm'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(PigVariants, 'PigVariants', 0)
}