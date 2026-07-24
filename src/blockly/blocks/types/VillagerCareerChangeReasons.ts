'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const VillagerCareerChangeReasons: SkriptType = {
  name: 'villager_career_change_reason',
  type: 'villagercareerchangereason',
  options: ['employed', 'losing job'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(VillagerCareerChangeReasons, 'VillagerCareerChangeReasons', 0)
}