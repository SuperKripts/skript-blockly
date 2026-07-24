'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const VillagerTypes: SkriptType = {
  name: 'villager_type',
  type: 'villagertype',
  options: ['snow', 'plains', 'jungle', 'taiga', 'desert', 'savanna', 'swamp'],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(VillagerTypes, 'Villager', 9793)
}