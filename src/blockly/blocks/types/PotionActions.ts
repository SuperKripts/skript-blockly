'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const PotionActions: SkriptType = {
  name: 'potion_action',
  type: 'potionaction',
  options: ['added', 'changed', 'cleared', 'removed'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(PotionActions, 'PotionActions', 0)
}