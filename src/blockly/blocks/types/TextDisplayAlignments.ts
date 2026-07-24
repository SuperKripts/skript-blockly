'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const TextDisplayAlignments: SkriptType = {
  name: 'text_display_alignment',
  type: 'text_display_alignment',
  options: ['center', 'left', 'right'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(TextDisplayAlignments, 'TextDisplayAlignments', 0)
}