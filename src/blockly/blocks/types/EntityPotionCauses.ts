'skript syntax'

import * as Blockly from 'blockly/core'
import type { SkriptType } from './Types'
import { createTypeBlock } from './Types'

export const EntityPotionCauses: SkriptType = {
  name: 'entity_potion_cause',
  type: 'entity_potion_cause',
  options: [
    'area effect cloud',
    'arrow',
    'attack',
    'axolotl',
    'warden',
    'beacon',
    'command',
    'conduit',
    'conversion',
    'death',
    'dolphin',
    'expiration',
    'food',
    'illusion',
    'milk',
    'plugin',
    'potion drink',
    'potion splash',
    'spider spawn',
    'totem',
    'turtle helmet',
    'unknown',
    'villager trade',
    'patrol captain',
    'wither rose',
  ],
}


export function register(): Blockly.utils.toolbox.BlockInfo {
  return createTypeBlock(EntityPotionCauses, 'EntityPotionCauses', 0)
}