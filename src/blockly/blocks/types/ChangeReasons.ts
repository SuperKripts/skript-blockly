'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const ChangeReasons: SkriptType = {
  name: 'change_reason',
  type: 'transformreason',
  options: ['plugin', 'pickup orb'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(ChangeReasons, 'ChangeReasons', 0)
}