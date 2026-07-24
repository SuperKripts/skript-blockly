'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const CowVariants: SkriptType = {
  name: 'cow_variant',
  type: 'cowvariant',
  options: ['cold', 'temperate', 'warm'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(CowVariants, 'CowVariants', 0)
}