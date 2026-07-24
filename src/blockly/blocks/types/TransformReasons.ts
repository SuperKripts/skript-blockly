'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const TransformReasons: SkriptType = {
  name: 'transform_reason',
  type: 'transformreason',
  options: ['cured', 'drowned', 'frozen', 'lightning', 'metamorphosis', 'piglin zombified', 'sheared', 'split', 'unknown', 'infection'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(TransformReasons, 'TransformReasons', 0)
}