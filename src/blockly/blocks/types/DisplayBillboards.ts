'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const DisplayBillboards: SkriptType = {
  name: 'display_billboard',
  type: 'display_billboard',
  options: ['center', 'fixed', 'horizontal', 'vertical'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(DisplayBillboards, 'DisplayBillboards', 0)
}