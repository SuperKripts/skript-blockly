'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const VillagerProfessions: SkriptType = {
  name: 'villager_profession',
  type: 'villagerprofession',
  options: [
    'leatherworker',
    'mason',
    'fletcher',
    'weaponsmith',
    'toolsmith',
    'librarian',
    'shepherd',
    'farmer',
    'cleric',
    'nitwit',
    'cartographer',
    'armorer',
    'butcher',
    'none',
    'fisherman',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(VillagerProfessions, 'VillagerProfessions', 0)
}