'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const HealReasons: SkriptType = {
  name: 'heal_reason',
  type: 'healreason',
  options: ['custom', 'eating', 'ender crystal', 'magic', 'magic regen', 'regen', 'satiated', 'wither', 'wither spawn'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(HealReasons, 'HealReasons', 0)
}