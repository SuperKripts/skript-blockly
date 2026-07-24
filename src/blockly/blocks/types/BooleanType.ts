'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const BooleanType: SkriptType = {
  name: 'boolean',
  type: 'boolean',
  options: ['true', 'false'],
}

export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(BooleanType, 'Boolean', 2135)
}
